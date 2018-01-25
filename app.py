import os
from logging import basicConfig, INFO
from flask import Flask

basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            level=INFO)

app = Flask(__name__)


@app.route('/')
def homepage():

    return """
    <h1>Hello Heroku</h1>
    """

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
