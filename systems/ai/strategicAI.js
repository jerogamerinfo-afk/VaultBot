function decideMove(enemy, player) {

  const hpRatio = enemy.hp / enemy.maxHp;

  // 🔴 bajo HP → defensa
  if (hpRatio < 0.3) {
    return { type: "defend", value: 30 };
  }

  // 🟡 jugador débil → ataque fuerte
  if (player.hp < 40) {
    return { type: "ultimate", value: enemy.atk * 2 };
  }

  // 🔵 normal → random inteligente
  const moves = ["attack", "attack", "skill", "defend"];

  const pick = moves[Math.floor(Math.random() * moves.length)];

  return {
    type: pick,
    value: enemy.atk + Math.floor(Math.random() * 15)
  };
}

module.exports = { decideMove };