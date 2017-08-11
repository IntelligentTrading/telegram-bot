from datetime import datetime
import requests
from commands.command_helpers import telegram_command


# todo: make a @telegram_alert decorator for sending alerts to chat_ids or all active subsribers
def coin_snapshot(symbol):

    # cryptocompare_data = get_snapshot(symbol)
    # coinmarketcap_data = get_ticker(symbol)

    # return "\n".join([
    #     symbol + " $" + coinmarketcap_data['price_usd'],
    #     "24hr volume " + str(int(float(cryptocompare_data['24hr_volume']))) + " " + symbol,
    #     percent_change + ", price: " + coinmarketcap_data['price_btc'] + " BTC",
    #     "Market Cap: $" + str(int(float(coinmarketcap_data['market_cap_usd']))),
    #     str(datetime.now())
    # ])

    pass
