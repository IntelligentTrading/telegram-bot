var token = process.env.TELEGRAM_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: false });
var commandManager = require('./command-manager.js').commandManager;
var replyTypes = require('./command').REPLY_TYPES;
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

            var args = match.filter(function (arg) {
                return arg != null && arg != undefined && arg.trim() != "";
            }).slice(2);

            console.log(`[Command] ${commandLabel} with arguments ${args}`);

            if (commandManager.hasOwnProperty(commandLabel)) {
                currentCommand = commandManager[commandLabel];

                //TODO 1. Re-engineer with promise-retry behavior 
                //TODO 2. Refactor of command-manager and <command>.js

                currentCommand.behaviour(args, chat.id)
                    .then(function (data) {

                        var opts = JSON.stringify(currentCommand.options);
                        console.log(`[Invoke] ${commandLabel} with options ${opts}.\n\n`);

                        if (currentCommand.reply_type == replyTypes.TEXT) {
                            console.log('Reply with text');
                        }
                        if (currentCommand.reply_type == replyTypes.PHOTO) {
                            console.log('Reply with photo');
                        }

                        bot.sendMessage(chat.id, currentCommand.message(data), currentCommand.options)
                            .then((value) => {
                                console.log(`[Executed] ${commandLabel} with options ${opts}.\n\n`);
                            })
                            .catch((reason) => {
                                console.log('[Bot] ' + reason);

                                bot.sendMessage(chat.id, "Uh-Oh! Something went wrong, please retry!");

                            });
                    }).catch(function (reason) {
                        console.log('Promise rejected: ' + reason);
                        bot.sendMessage(chat.id, "Uh-Oh! Something went wrong, please retry!");
                    });
            }
            else
                bot.sendMessage(chat.id, commandManager.unknown.message());

        }
    }// bot is sending a callback_query
    else if (telegram_message.callback_query !== undefined) {

        console.log(telegram_message);

        const chat_id = telegram_message.callback_query.message.chat.id;
        const message_id = telegram_message.callback_query.message.message_id;
        const callback_data = telegram_message.callback_query.data;

        console.log(`[BOT] Callback ${callback_data}`);

        //Telegram commands expire!!!
        if (currentCommand === undefined) {
            bot.answerCallbackQuery(telegram_message.callback_query.id, 'Please, perform action again', true);
        }
        else {
            currentCommand
                .callback(callback_data, chat_id, message_id)
                //! Telegram requires answerCallbackQuery
                .then(function (callback_message_data) {
                    bot.answerCallbackQuery(telegram_message.callback_query.id, currentCommand.callback_message())
                        .then(function () {
                            /*
                                ! send the reply through the chat since the message might be too long for the popup
                                TODO Write proper option parameter for the sendMessage on callback
                                TODO Maybe a chain system 
                            */
                            if (currentCommand.reply_type == replyTypes.EDIT) {
                                bot.editMessageText(currentCommand.callback_chat_message(callback_message_data), currentCommand.callback_options);
                            }
                            else {
                                bot.sendMessage(chat_id, currentCommand.callback_chat_message(callback_message_data), { "parse_mode": "Markdown" });
                            }
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