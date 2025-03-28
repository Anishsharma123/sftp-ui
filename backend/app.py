
from flask import Flask, jsonify
from flask_cors import CORS
import threading
import socketserver
from sftpserver.stub_sftp import StubServer

app = Flask(__name__)
CORS(app)


server_thread = None
server_instance = None

class SFTPServerThread(threading.Thread):
    def run(self):
        global server_instance
        server = socketserver.TCPServer(("0.0.0.0", 3373), StubServer)
        server_instance = server
        server.serve_forever()

@app.route("/start", methods=["POST"])
def start_server():
    global server_thread
    if server_thread and server_thread.is_alive():
        return jsonify({"status": "already running"})
    server_thread = SFTPServerThread()
    server_thread.start()
    return jsonify({"status": "started"})

@app.route("/stop", methods=["POST"])
def stop_server():
    global server_instance
    if server_instance:
        server_instance.shutdown()
        return jsonify({"status": "stopped"})
    return jsonify({"status": "not running"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)

