function bossAI(boss, player) {

  const hpPercent = boss.hp / boss.maxHp;

  // 🔴 PHASE 3 — ENRAGE
  if (hpPercent < 0.3) {
    return {
      phase: 3,
      pattern: "ENRAGED_COMBO",
      attacks: ["meteor_storm", "instant_dash", "arena_wipe"]
    };
  }

  // 🟡 PHASE 2 — AGGRESSIVE
  if (hpPercent < 0.6) {
    return {
      phase: 2,
      pattern: "AGGRESSIVE",
      attacks: ["multi_slash", "jump_attack"]
    };
  }

  // 🟢 PHASE 1
  return {
    phase: 1,
    pattern: "STANDARD",
    attacks: ["slow_swing"]
  };
}

module.exports = { bossAI };