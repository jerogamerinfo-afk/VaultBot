function aiMove(player, enemy) {

  const choice = Math.random();

  if (enemy.hp < 30 && choice < 0.5) {
    return { action: "heal", value: 20 };
  }

  if (choice < 0.8) {
    const dmg = enemy.atk + Math.floor(Math.random() * 20);
    return { action: "attack", value: dmg };
  }

  return { action: "defend", value: 10 };
}

module.exports = { aiMove };