function useSkill(player, enemy) {

  const damage =
    player.attack +
    Math.floor(Math.random() * 20);

  enemy.hp -= damage;

  return {
    text: `⚡ ${player.classSkill} hace ${damage} daño`
  };
}

module.exports = { useSkill };