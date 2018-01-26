from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mys3cr31'
socketio = SocketIO(app)

@socketio.on('message')
def handlem(msg):
    send(msg, broadcast=True, include_self=False)

@app.route('/')
def homepage():
    return render_template('chat.html')

if __name__ == '__main__':
    socketio.run(app)
