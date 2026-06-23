from flask import Flask, request
import random

app = Flask(__name__)

player_memory = {}

@app.route("/learn", methods=["POST"])
def learn():

    data = request.json
    pid = data["player_id"]
    action = data["action"]

    if pid not in player_memory:
        player_memory[pid] = {"attack": 0, "dodge": 0, "parry": 0}

    player_memory[pid][action] += 1

    return {"status": "learned"}

@app.route("/predict", methods=["POST"])
def predict():

    pid = request.json["player_id"]

    data = player_memory.get(pid, None)

    if not data:
        return {"style": "neutral"}

    if data["dodge"] > data["attack"]:
        return {"style": "aggressive_counter"}

    if data["parry"] > data["attack"]:
        return {"style": "unpredictable"}

    return {"style": "balanced"}

app.run(port=5000)