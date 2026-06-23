const memory = new Map();

function learn(playerId, action) {

  if (!memory.has(playerId)) {
    memory.set(playerId, []);
  }

  memory.get(playerId).push(action);
}

function counter(playerId) {

  const actions = memory.get(playerId) || [];

  const attack = actions.filter(a => a === "attack").length;
  const dodge = actions.filter(a => a === "dodge").length;

  if (attack > dodge) return "DEFENSE_MODE";
  if (dodge > attack) return "AGGRESSIVE_MODE";

  return "BALANCED";
}

module.exports = { learn, counter };