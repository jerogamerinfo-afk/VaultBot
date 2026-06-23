function evolve(player) {

  if (player.level >= 50) {
    player.class = "legendary";
  } else if (player.level >= 25) {
    player.class = "advanced";
  }

  return player;
}

module.exports = { evolve };