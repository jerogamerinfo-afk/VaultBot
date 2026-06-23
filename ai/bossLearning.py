memory = {}

def learn(player_id, action):

    if player_id not in memory:
        memory[player_id] = {"attack": 0, "dodge": 0, "parry": 0}

    memory[player_id][action] += 1


def predict_style(player_id):

    data = memory.get(player_id)

    if not data:
        return "neutral"

    if data["dodge"] > data["attack"]:
        return "punish_aggressive"

    if data["parry"] > data["attack"]:
        return "unpredictable_mode"

    return "balanced"

function bossDecision(playerData) {

  if (playerData.style === "punish_aggressive") {
    return "fake_attack_then_delay";
  }

  if (playerData.style === "unpredictable_mode") {
    return "random_combo_chain";
  }

  return "standard_pattern";
}