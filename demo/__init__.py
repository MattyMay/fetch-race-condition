import flask
import time

app = flask.Flask(__name__)

@app.route('/')
def index():
    return """
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/static/css/style.css">
    </head>
    <body>
      <div id="reactEntry"></div>
    </body>
    <script src="/static/js/bundle.js"></script>
    </html>
    """

@app.route('/data/<int:datum_id>/')
def data(datum_id):
    # sleep 5 seconds if data_id is 2 to simulate a long request
    if datum_id == 2:
        time.sleep(3)
    return flask.jsonify({'datum_id': datum_id})
