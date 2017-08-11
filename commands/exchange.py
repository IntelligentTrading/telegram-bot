import requests
from commands.command_helpers import telegram_command


@telegram_command("exchanges")
def exchanges():
    try:
        req = requests.get('https://optimal-oasis-170206.appspot.com/exchanges')
        exchange_data = req.json()

        return '\n'.join([
            "Options: "
            ] + [
            exchange_data['name'] for exchange_data in exchange_data['exchanges']
            ] + [
            "",
            "set with command",
            "/exchange <name>"
        ])

    except Exception as e:
        return "Worker service in maintenance!"

exchanges.help_text = "list of supported exchanges"


@telegram_command("exchange", pass_args=True)
def exchange(args):

    if 'POLO' in args[0].upper():
        return "Poloniex exchange set as default"
    else:
        return "Only Poloniex is available. Poloniex exchange set as default."

exchange.help_text = "set the default exchange"
