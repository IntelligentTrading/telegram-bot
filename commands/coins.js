var Command = require('./command.js').command;
var coins = new Command('Exchange');

var datastoreConfig = require('../config.js').datastoreConfig;
const Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore(datastoreConfig);


coins.message = function(coins_exc){
    try{
        return "Do you can choice the coin price with comparison below:\n\n"+
                coins_exc.join('\n')+
        "\n\nfor example: /price USDT_BTC";
    }
    catch(err)
    {
        return "Worker service in maintenance!"
    }
}

coins.help_text = "list of all coins for using /price command";
exports.coins = coins;



coins.behaviour = function () {
    return new Promise((resolve, reject) => {
            try {
                query = datastoreClient.createQuery(kind = 'Channels').order('timestamp', { descending: true }).limit(1);

                datastoreClient.runQuery(query).then(function (entities) {

                    var content = entities[0][0].content;
                    var price_data = JSON.parse(content.replace(/'/g, "\""));
                    var coins_exc = [];
                    
                            for (i = 0; i < Object.keys(price_data).length; i++){
                                coins_exc.push(Object.keys(price_data)[i]);
                            }

                    resolve(coins_exc);
                });
            }
            catch (err) {
                reject("Please check the name of coin. Coin not found!");
            }
    });
}


/*client = datastore.Client()
query = client.query(kind='Channels', order=['-timestamp'])
content = list(query.fetch(limit=1))[0]['content']

result = json.loads(content.replace("'", "\""))
msg = []

for key in result.keys():
    msg.append(key)




data = sorted(req.json())
result = str(data).replace("[", "").replace("]", "").replace("'", "")

return "\n".join([
    "Do you can choice the coin price with comparison below:",
    result,
    "for example: /price USDT_BTC",
])*/