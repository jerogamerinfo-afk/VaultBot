function resolveCombat(player, boss, input) {

  const now = Date.now();

  const timing = now - input.actionTime;

  // 🟡 PERFECT DODGE (Dark Souls style)
  if (input.action === "dodge" && timing < 180) {
    return {
      result: "PERFECT_DODGE",
      damageTaken: 0,
      animation: "dodge_perfect"
    };
  }

  // 🔴 PERFECT PARRY
  if (input.action === "parry" && timing < 120) {
    return {
      result: "PARRY",
      bossStunned: true,
      animation: "parry_success",
      damage: boss.atk * 2
    };
  }

  // ⚔️ HIT NORMAL
  return {
    result: "HIT",
    damageTaken: boss.atk,
    animation: "hit_react"
  };
}

module.exports = { resolveCombat };