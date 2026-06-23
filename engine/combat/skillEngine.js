const comboState = new Map();

function useSkill(userId, skill) {

  if (!comboState.has(userId)) {
    comboState.set(userId, []);
  }

  const chain = comboState.get(userId);

  chain.push(skill);

  if (chain.length >= 3) {

    const combo = "🔥 COMBO ULTIMATE";
    comboState.set(userId, []);

    return {
      damage: 120,
      combo
    };
  }

  return {
    damage: skill === "fire" ? 40 : 20,
    combo: null
  };
}

module.exports = { useSkill };