var Command = require('./command.js').command;
require('../libs/extentions.js');

var help = new Command('Bot');
help.command_list = function(){
return `/price - The current valuation of a coin. For example: /price BTC
/volume - Last 24 hour volume data. For example: /volume BTC
/feedback - Help us improve the Bot with your own ideas.
/help - Get a list of all commands.`;
}


help.message = function(){
    return `Here's a list of all commands currently available:\n${this.command_list()}`;
};

help.help_text = "Get a list of all commands.";
help.options = {"parse_mode":"Markdown"};


help.behaviour = function(params){ return new Promise((resolve, reject) => {
    try{
        resolve(params);
    }
    catch(err){
        reject('Help promise rejected - '+err);
    }
});
}

exports.help = help;