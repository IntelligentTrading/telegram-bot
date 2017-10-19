var CommandClass = require('./command.js');
var Command = CommandClass.command;

var settings = new Command('Trading', "Manage your settings and trading profile.", function (message) {
    return message;
});

var main_settings = {
    message: "Manage your settings",
    kb:
    [
        [{ text: "Edit Risk Profile", callback_data: "RSK" }],
        [{ text: "Edit Trader Profile", callback_data: "TRD" }]
    ]
};

var risk_settings = {
    message: "Please select which risk profile suits you best. I will adjust your signals accordingly in conjunction with your trader profile.",
    kb: [
        [{text: "Only the safest trade signals (Beginners)", callback_data: "RSK_1"}],
        [{text: "Any signal, reputable coins only (Standard)", callback_data: "RSK_2"}],
        [{text: "Any signal, including low value coins (High risk high reward)", callback_data: "RSK_3"}],
        [{text: "Cancel", callback_data: "CANC"}]
    ]
};

var profiles = {
    MAIN : main_settings,
    RSK : risk_settings,
};

settings.options = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "inline_keyboard": profiles.MAIN.kb
    }
};

settings.reply_type = CommandClass.REPLY_TYPES.EDIT;

settings.behaviour = function () {
    return new Promise((resolve, reject) => {
        resolve(main_settings.message);
    })
};

settings.callback = (selected_opt, chat_id, message_id) => {

    settings.callback_options = {
        chat_id: chat_id,
        message_id: message_id,
        parse_mode : "Markdown",
        reply_markup: profiles.RSK.kb
    };

    return profiles.RSK.message;
}


exports.settings = settings;