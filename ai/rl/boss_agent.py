import torch
import torch.nn as nn
import random

class BossNet(nn.Module):

    def __init__(self):
        super().__init__()
        self.fc = nn.Sequential(
            nn.Linear(10, 64),
            nn.ReLU(),
            nn.Linear(64, 3)  # attack / dodge / combo
        )

    def forward(self, x):
        return self.fc(x)


class BossAgent:

    def __init__(self):
        self.model = BossNet()
        self.memory = []

    def choose_action(self, state):

        state = torch.tensor(state, dtype=torch.float32)

        logits = self.model(state)

        action = torch.argmax(logits).item()

        return ["attack", "dodge", "combo"][action]

    def reward(self, action, reward):

        self.memory.append((action, reward))