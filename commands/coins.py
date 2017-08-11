import requests
from commands.command_helpers import telegram_command


@telegram_command("coins")
def coins():
    try:
        req = requests.get('https://optimal-oasis-170206.appspot.com/price/list')
        data = sorted(req.json())
        result = str(data).replace("[", "").replace("]", "").replace("'", "")

        return "\n".join([
            "Do you can choice the coin price with comparison below:",
            result,
            "for example: /price USDT_BTC",
        ])

    except Exception as e:
        return "Worker service in maintenance!"


coins.help_text = "list of all coins for using /price command"
