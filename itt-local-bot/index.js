'use strict';

console.log('Starting ITT Dev...\n');
const token = process.env.ITT_DEV_TELEGRAM_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

var commandManager = require('./commands/command-manager.js').commandManager;
var currentCommand = undefined;

// match with /<cmd> [params]
bot.onText(/\/(\w+)( )*(\w+){0,1}/, (msg,match) => {
    if(commandManager.hasOwnProperty(match[1])){
        
        //cleaning args
        currentCommand = commandManager[match[1].trim()];
        var args = match.filter(function(arg){
            return arg != null && arg != undefined && arg.trim() != "";
        }).slice(2);

        currentCommand.behaviour(args).then(function(data){
            bot.sendMessage(msg.chat.id, currentCommand.message(data), currentCommand.options);
        });
    }
    else
        bot.sendMessage(msg.chat.id, commandManager.unknown.message());     
});

// Handles the inline button press event
bot.on('callback_query', (msg) => {
    
    var opt = {
        callback_query_id: msg.id,
        text:'',
        show_alert: false,
    };
    
    try{
        var args = [];
        args.push(msg.data);
        opt.text = currentCommand.message(args);
    }catch(err)
    {
        opt.text = 'Something went wrong!'
        opt.show_alert = true;
    }
    finally{
        bot.answerCallbackQuery(opt);
    }
});

bot.on('message', (msg) => {
    
    var Hi = "Hi";
    if (msg.text === Hi) {
        bot.sendMessage(msg.chat.id,'Hello '+msg.from.first_name+'!');
    } 
});