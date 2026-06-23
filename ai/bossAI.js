function bossAI(boss, players) {

  const avgHp = players.reduce((a, p) => a + p.hp, 0) / players.length;

  // 🔴 PHASE 3 — ELDEN RING MODE
  if (boss.hp < boss.maxHp * 0.25) {
    return {
      phase: 3,
      mechanic: "☠️ ONE SHOT COMBOS",
      attack: boss.atk * 3,
      pattern: "teleport + aoe + delay attacks"
    };
  }

  // 🟡 PHASE 2
  if (boss.hp < boss.maxHp * 0.6) {
    return {
      phase: 2,
      mechanic: "⚡ AGGRESSIVE COMBOS",
      attack: boss.atk * 2,
      pattern: "chain attacks + traps"
    };
  }

  // 🟢 PHASE 1
  return {
    phase: 1,
    mechanic: "⚔️ NORMAL PATTERN",
    attack: boss.atk,
    pattern: "predictable attacks"
  };
}

module.exports = { bossAI };