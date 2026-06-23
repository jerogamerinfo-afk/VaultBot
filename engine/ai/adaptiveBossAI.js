const playerHistory = new Map();

function recordPlayerAction(playerId, action) {

  if (!playerHistory.has(playerId)) {
    playerHistory.set(playerId, []);
  }

  playerHistory.get(playerId).push(action);
}

function getCounterStrategy(playerId) {

  const actions = playerHistory.get(playerId) || [];

  const freq = {
    attack: 0,
    defend: 0,
    skill: 0
  };

  actions.forEach(a => freq[a]++);

  if (freq.attack > freq.defend) {
    return "DEFENSIVE_MODE";
  }

  if (freq.skill > freq.attack) {
    return "ANTI_SKILL_MODE";
  }

  return "BALANCED";
}

function bossAI(boss, playerId) {

  const mode = getCounterStrategy(playerId);

  if (mode === "DEFENSIVE_MODE") {
    return { phase: 3, action: "COUNTER_ATTACK", dmg: boss.atk * 2.5 };
  }

  if (mode === "ANTI_SKILL_MODE") {
    return { phase: 2, action: "DISRUPT", dmg: boss.atk * 1.8 };
  }

  return { phase: 1, action: "NORMAL", dmg: boss.atk };
}

module.exports = { recordPlayerAction, bossAI };