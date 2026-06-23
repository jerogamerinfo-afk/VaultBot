import json

memory_file = "boss_memory.json"

def load_memory():
    try:
        return json.load(open(memory_file))
    except:
        return {}

def save_memory(data):
    json.dump(data, open(memory_file, "w"))

def learn(player_id, action):

    memory = load_memory()

    if player_id not in memory:
        memory[player_id] = {"attack": 0, "dodge": 0, "parry": 0}

    memory[player_id][action] += 1

    save_memory(memory)


def decide(player_id):

    memory = load_memory().get(player_id, {})

    if memory.get("dodge", 0) > memory.get("attack", 0):
        return "anti_dodge_mode"

    if memory.get("parry", 0) > 3:
        return "fake_attack_chain"

    return "balanced"