import random

class BossAI:

    def __init__(self):
        self.memory = {}
        self.strategy = "neutral"

    def reward(self, player_action, success):

        if player_action not in self.memory:
            self.memory[player_action] = 0

        if success:
            self.memory[player_action] += 1
        else:
            self.memory[player_action] -= 1

    def choose_action(self):

        if self.memory.get("dodge", 0) > self.memory.get("attack", 0):
            return "anti_dodge_combo"

        if self.memory.get("parry", 0) > 2:
            return "fake_attack_delay"

        return random.choice(["basic_attack", "heavy_attack"])