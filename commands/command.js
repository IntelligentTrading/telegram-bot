
var command = function (type, help_text, message, behaviour) {
    this.type = type;
    this.help_text = help_text;
    this.message = message;
    this.behaviour = function (params) {
        return new Promise((resolve, reject) => {
            resolve(params);
        });
    };

    this.callback = function(data,chat_id){return new Promise((resolve, reject) => { resolve('Undefined callback')})};
    this.callback_message = function(data){ return data }; // typically a pop-up or a progress message
    this.callback_chat_message = function(data){return data};
    this.options = {};
};

command.NotImplementedMessage = 'Command not yet implemented';

exports.command = command;