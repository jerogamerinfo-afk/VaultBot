function raidBossAI(boss, players, time) {

  const alive = players.filter(p => p.hp > 0);

  // 🔴 FASE 3 — WIPE MECHANICS
  if (boss.hp < boss.maxHp * 0.25) {
    return {
      phase: 3,
      mechanic: "☠️ GLOBAL WIPE ATTACK",
      action: "meteor_fall",
      damage: boss.atk * 3
    };
  }

  // 🟡 FASE 2 — RAID MECHANICS
  if (boss.hp < boss.maxHp * 0.6) {
    return {
      phase: 2,
      mechanic: "⚡ MARK + EXPLOSIONS",
      action: "targeted_aoe",
      damage: boss.atk * 1.8
    };
  }

  // 🟢 FASE 1 — BASIC
  return {
    phase: 1,
    mechanic: "⚔️ NORMAL ATTACK PATTERN",
    action: "melee_combo",
    damage: boss.atk
  };
}

module.exports = { raidBossAI };