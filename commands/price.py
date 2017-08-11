import simplejson as json
from google.cloud import datastore
from commands.command_helpers import telegram_command


# @telegram_command("cryptocompare_price", pass_args=True)
# def cryptocompare_price(args):
#     #todo: refactor to use worker & datastore
#     return get_price(",".join(args).upper(), "USD,BTC")
#
# cryptocompare_price.help_text = "get the price for any crypto ticker eg. ETH"


@telegram_command("price", pass_args=True)
def price(args):
    try:

        client = datastore.Client()
        query = client.query(kind='Channels', order=['-date'])
        content = list(query.fetch(limit=1))[0]['content']
        price_data = json.loads(content.replace("'", "\""))

        new_args = str(args).replace("[", "").replace("]", "").replace("'", "")
        data = price_data[new_args]

        return "\n".join([
            "Base Volume: %s" % data['baseVolume'],
            "High Last 24hr: %s" % data['high24hr'],
            "Highest Bid: %s" % data['highestBid'],
            "Last Price: %s" % data['last'],
            "Low Last 24hr: %s" % data['low24hr'],
            "Lowest Ask: %s" % data['lowestAsk'],
            "Percent Change: %s" % data['percentChange'],
            "Quote Volume: %s" % data['quoteVolume'],
        ])

    except Exception as e:
        print(str(e))
        return "Please check the name of coin. Coin not found!"

price.help_text = "get the price for any coin pair in /coins"


def get_last_price(symbol, channel="Poloniex"):
    """
    get latest price from datastore
    :param symbol: "ETH"
    :param channel: "Poloniex"
    :return: integere price in satoshis
    """

    # query database for latest price data
    client = datastore.Client()
    query = client.query(kind='Indicators')
    query.add_filter('symbol', '=', symbol)
    query.add_filter('ilk', '=', 'price')
    query.order = ['-timestamp']
    datastore_entity = list(query.fetch(limit=100))[0]

    # datastore entity example
    # {'ilk': 'price',
    # 'symbol': symbol,
    # 'value': int(price_data['last'] * 8),  # satoshis
    # 'timestamp': timestamp,
    # 'channel': channel,
    #  }

    return datastore_entity['value']


def get_last_price_humanized(symbol):
    return "BTC {:,.8f}".format(get_last_price(symbol)/100000000)
