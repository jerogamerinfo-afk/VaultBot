import torch
import random

class BossRL:

    def __init__(self):
        self.memory = {}

    def observe(self, player_id, action, result):

        if player_id not in self.memory:
            self.memory[player_id] = {"attack": 0, "dodge": 0, "parry": 0}

        if result == "success":
            self.memory[player_id][action] += 1
        else:
            self.memory[player_id][action] -= 1

    def policy(self, player_id):

        data = self.memory.get(player_id, {})

        if data.get("dodge", 0) > data.get("attack", 0):
            return "anti_dodge_combo"

        if data.get("parry", 0) > 3:
            return "feint_attack"

        return random.choice(["rush", "heavy", "combo"])