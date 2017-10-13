var Command = require('./command.js').command;

var feedback = new Command('Bot', "Send in any kind of ideas you may have on the ITT Trading Bot. Try /feedback <your idea>", function(message){
    return message;

});

feedback.behaviour = function(comment){
    return new Promise((resolve, reject) => {

        if(comment == null || comment == undefined || comment.length == 0)
        {
            resolve("Got any comments? We'd love to hear those! You can send us your thoughts by simply typing them behind the /feedback command. For example: /feedback More signals!");
        }
        else
        {
            resolve("Thanks! Your feedback has been sent to the team and will be reviewed shortly.");
        }
    })
};  

exports.feedback = feedback;