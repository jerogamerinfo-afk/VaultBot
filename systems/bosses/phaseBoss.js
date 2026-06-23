function bossAI(boss) {

  const hpRatio = boss.hp / boss.maxHp;

  // PHASE 3 — enrage
  if (hpRatio < 0.2) {
    return {
      phase: 3,
      attack: boss.atk * 3,
      skill: "☠️ DESTRUCCIÓN FINAL"
    };
  }

  // PHASE 2 — agresivo
  if (hpRatio < 0.5) {
    return {
      phase: 2,
      attack: boss.atk * 2,
      skill: "🔥 FURIA DEL ABISMO"
    };
  }

  // PHASE 1 — normal
  return {
    phase: 1,
    attack: boss.atk,
    skill: "⚔️ golpe normal"
  };
}

module.exports = { bossAI };