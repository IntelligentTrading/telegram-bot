from requests import get, RequestException

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
        req = get('https://optimal-oasis-170206.appspot.com/price')
        new_args = str(args).replace("[", "").replace("]", "").replace("'", "")
        data = req.json()[new_args]

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

    except RequestException as e:
        print(str(e))
        return "Please check the name of coin. Coin not found!"


price.help_text = "get the price for any coin pair in /coins"
