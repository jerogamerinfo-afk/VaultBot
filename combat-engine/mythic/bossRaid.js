function raidBoss(players, boss) {

  const alive = players.filter(p => p.hp > 0);

  const mechanics = [];

  // 🧨 split mechanics depending on players
  if (alive.length > 5) {
    mechanics.push("AOE_SPLIT_DAMAGE");
  }

  if (boss.hp < boss.maxHp * 0.5) {
    mechanics.push("PHASE_SHIFT");
  }

  if (alive.some(p => p.role === "tank")) {
    mechanics.push("TANK_BUSTER");
  }

  return {
    phase: boss.hp < boss.maxHp * 0.3 ? 3 : 2,
    mechanics,
    difficulty: alive.length * 1.2
  };
}

module.exports = { raidBoss };