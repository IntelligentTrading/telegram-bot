'use strict';

const envVariables = require('dotenv').config({ path: './config/prod.env' });
if (envVariables.error) {
  console.log('\nError loading .env file...');
} else {
  console.log('\n\nVariables loaded...');
}

console.log('Running in ' + process.env.STAGE + ' mode.');
var dispatcher = require('./commands/dispatcher.js');

// DEV only: I use this to remove all the reply_keyboard which will 
// get stuck in the chat forever! (Telegram requirement)
//dispatcher.remove_all_keyboards(25690852)

exports.botHandler = function (req, res) {
  try {
    dispatcher.dispatch(req.body);
    res.status(200).send('Command executed.');
  }
  catch (err) {
    console.log(err.message);
    res.status(500).send('Error:' + err.message + '\n');
  }
}

exports.event = (event, callback) => {
  callback();
};