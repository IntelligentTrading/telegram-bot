var Command = require('./command.js').command;

var volume = new Command('Trading', "get the volume for a coin ticker. Try: /volume BTC", function(){
    return Command.NotImplementedMessage;
});

volume.behaviour = function(){
    return new Promise((resolve, reject) => {
        resolve('OK');
    })
};  

exports.volume = volume;