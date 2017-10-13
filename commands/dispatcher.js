var token = process.env.TELEGRAM_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: false });
var commandManager = require('./command-manager.js').commandManager;
var currentCommand = undefined;

var commandRegEx = /\/(\w+)( )*(\w+){0,1}/;

var dispatch = function (telegram_message) {
    // Bot is sending a message

    if (telegram_message.message !== undefined) {

        const { message: { chat, text } } = telegram_message;
        var match = commandRegEx.exec(text);

        console.log('Matches: ' + match);

        if (match === undefined || match === null) {
            bot.sendMessage(chat.id, commandManager.repeat.message());
        }
        else {
            var commandLabel = match[1];
            console.log(commandLabel);
            var args = match.filter(function (arg) {
                return arg != null && arg != undefined && arg.trim() != "";
            }).slice(2);

            if (commandManager.hasOwnProperty(commandLabel)) {
                //cleaning args
                currentCommand = commandManager[commandLabel];

                // 1. Re-engineer with promise-retry behavior 
                // 2. Refactor of command-manager and <command>.js
                currentCommand.behaviour(args, chat.id)
                    .then(function (data) {

                        bot.sendMessage(chat.id, currentCommand.message(data), currentCommand.options)
                            .then((value) => {
                                console.log('Command ' + commandLabel + ' executed.\n\n');
                            })
                            .catch((reason) => {
                                console.log('[Bot] ' + reason);

                                bot.sendMessage(chat.id, "Uh-Oh! Something went wrong, please retry!");

                            });
                    }).catch(function () {
                        console.log('Promise rejected');
                    });
            }
            else
                bot.sendMessage(chat.id, commandManager.unknown.message());

        }
    }// bot is sending a callback_query
    else if (telegram_message.callback_query !== undefined) {

        const chat_id = telegram_message.callback_query.message.chat.id;
        const callback_data = telegram_message.callback_query.data;

        console.log(`[BOT] Callback ${callback_data}`);

        //Telegram commands expire!!!
        if (currentCommand === undefined) {
            bot.answerCallbackQuery(telegram_message.callback_query.id, 'Please, perform action again', true);
        }
        else {
            currentCommand
                // execute the command callback
                .callback(callback_data, chat_id)
                // call answerCallbackQuery, Telegram requires it!
                .then(function (callback_message_data) {
                    bot.answerCallbackQuery(telegram_message.callback_query.id, currentCommand.callback_message())
                        .then(function () {
                            // send the reply through the chat since the message might be too long for the popup!
                            bot.sendMessage(chat_id, currentCommand.callback_chat_message(callback_message_data));
                        })
                        .catch(function (rejectionErr) {
                            throw new Error(rejectionErr);
                        });
                })
                .catch(function (errReason) {
                    console.log(errReason);
                    bot.answerCallbackQuery(telegram_message.callback_query.id, 'Uh Oh, please try again!');
                });
        }
    }
    else {
        bot.sendMessage(chat.id, commandManager.repeat.message());
    }
}


var remove_all_keyboards = function (chat_id) {

    var options = {
        reply_markup: {
            remove_keyboard: true
        }
    };

    bot.sendMessage(chat_id, 'Removing keyboards', options);
}

exports.dispatch = dispatch;
exports.remove_all_keyboards = remove_all_keyboards;