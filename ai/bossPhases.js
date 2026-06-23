function bossMechanics(boss) {

  const hp = boss.hp / boss.maxHp;

  // 🔴 PHASE 3 - ENRAGED (DARK SOULS MODE)
  if (hp < 0.25) {
    return {
      phase: 3,
      mechanic: "🔥 AREA WIPE",
      damage: boss.atk * 3,
      pattern: "random combos + aoe"
    };
  }

  // 🟡 PHASE 2 - AGGRESSIVE
  if (hp < 0.6) {
    return {
      phase: 2,
      mechanic: "⚡ FAST COMBOS",
      damage: boss.atk * 2,
      pattern: "chain attacks"
    };
  }

  // 🟢 PHASE 1 - NORMAL
  return {
    phase: 1,
    mechanic: "⚔️ BASIC PATTERN",
    damage: boss.atk,
    pattern: "predictable attacks"
  };
}

module.exports = { bossMechanics };