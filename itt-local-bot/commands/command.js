
var command = function (type, help_text, message, behaviour) {
    this.type = type;
    this.help_text = help_text;
    this.message = message;
    this.behaviour = function (params) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    };
};

command.options = {};

exports.command = command;