var config = {
    projectId: 'optimal-oasis-170206',
    keyFilename: '.gcloud/keyfile.json'
  };

var telegramConfig = {
  token : '<token>' // from process.env.TELEGRAM_TOKEN will be better
}

exports.config = config;
exports.telegramConfig = telegramConfig;