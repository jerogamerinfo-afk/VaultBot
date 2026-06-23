const EVOLUTIONS = {
  warrior: {
    level30: "warrior_pro",
    level60: "warrior_god"
  },

  mage: {
    level30: "mage_pro",
    level60: "mage_arch"
  }
};

function evolve(player) {

  const evo = EVOLUTIONS[player.class];

  if (!evo) return player;

  if (player.level >= 60) player.class = evo.level60;
  else if (player.level >= 30) player.class = evo.level30;

  return player;
}

module.exports = { evolve };