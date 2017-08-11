import os
from logging import basicConfig, INFO
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from commands.command_index import commands as command_list
from commands.command_index import unknown_command
from google.cloud import datastore


basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            level=INFO)


try:
    TELEGRAM_TOKEN = os.environ['TELEGRAM_TOKEN']
except:
    client = datastore.Client()
    query = client.query(kind='Secret')
    query.add_filter('KEY', '=', 'TELEGRAM_TOKEN')
    query.add_filter('ENVIRONMENT', '=', 'STAGE')
    TELEGRAM_TOKEN = list(query.fetch(limit=1))[0]['VALUE']


def main():
    """ Main """
    updater = Updater(token=TELEGRAM_TOKEN)

    dispatcher = updater.dispatcher

    # REGISTER HANDLERS FOR ALL COMMANDS
    for command in command_list:
        try:
            dispatcher.add_handler(
                CommandHandler(command.execution_handle,
                               command,
                               pass_args=command.pass_args)
            )
        except Exception as e:
            print(str(e))
            # print("Error loading handler " + command.execution_handle)

    # UNKNOWN-COMMAND HANDLER
    unknown_handler = MessageHandler(Filters.command, unknown_command)
    dispatcher.add_handler(unknown_handler)

    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
