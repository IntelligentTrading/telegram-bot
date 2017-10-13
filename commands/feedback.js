var Command = require('./command.js').command;

var options = {
    reply_markup: {
        inline_keyboard: [
            [{
                text: 'Send a feedback!',
                callback_data: 'FEE'
            }],
            [{
                text: 'Rate ITT!',
                callback_data: 'RAT'
            }]
        ]
      }
    };

var feedback = new Command('Bot', "Send in any kind of ideas or thoughts you may have on the ITT Trading Bot", function(){
    this.options = options;
    return "Tell me, what do you want to do?\n"
});

feedback.callback = function(data,chat_id){
    return new Promise((resolve, reject) => {
        resolve('Gotcha, thanks for sharing!');
    })
}  

feedback.behaviour = function(){
    return new Promise((resolve, reject) => {
        resolve('OK');
    })
};  

exports.feedback = feedback;