function bossAI(boss, players) {

  const avgHp = players.reduce((a, p) => a + p.hp, 0) / players.length;

  // FASE 3 - ENRAGED
  if (boss.hp < boss.maxHp * 0.25) {
    return {
      phase: 3,
      action: "ULTIMATE",
      damage: boss.atk * 3
    };
  }

  // FASE 2 - ADAPTIVE
  if (boss.hp < boss.maxHp * 0.6) {
    return {
      phase: 2,
      action: avgHp < 50 ? "FINISHER" : "AOE",
      damage: boss.atk * 2
    };
  }

  // FASE 1 - NORMAL
  return {
    phase: 1,
    action: "ATTACK",
    damage: boss.atk
  };
}

module.exports = bossAI;