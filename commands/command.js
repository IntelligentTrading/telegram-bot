
var command = function (type, help_text, message, behaviour) {
    this.type = type;
    this.help_text = help_text;
    this.message = message;
    this.behaviour = function (params) {
        return new Promise((resolve, reject) => {
            resolve(params);
        });
    };

    this.callback = function (data, chat_id, message_id) { return new Promise((resolve, reject) => { resolve('Undefined callback') }) };
    this.callback_message = function (data) { return data }; // typically a pop-up or a progress message
    this.callback_chat_message = function (data) { return data };
    this.options = {};
    this.callback_options = {};
    this.reply_type = REPLY_TYPES.TEXT;
};

command.NotImplementedMessage = 'Command not yet implemented';

var REPLY_TYPES = {
    TEXT: 0,
    PHOTO: 1,
    AUDIO: 2,
    EDIT: 3
};

exports.command = command;
exports.REPLY_TYPES = REPLY_TYPES;