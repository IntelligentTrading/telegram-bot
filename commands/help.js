var Command = require('./command.js').command;
require('../libs/extentions.js');

var help = new Command('Bot');
help.commands = [];
help.message = function(){
    var text = 'Available commands:\n';

    var cmdGroups = this.commands.groupBy('type');

    for(i = 0; i< Object.keys(cmdGroups).length;i++){

        if(Object.keys(cmdGroups)[i] != 'undefined')
        {
        text+='\n*'+Object.keys(cmdGroups)[i]+'*\n';

        cmdGroups[Object.keys(cmdGroups)[i]]
        .forEach(c => {
            if(c != undefined && c.name != 'unknown'){
                    text += '/'+c.name+' - '+c.help_text+'\n';
                }
            });
        }
    }
    return text;
};
help.help_text = "list of available commands";
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