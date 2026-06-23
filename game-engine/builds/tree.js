const BUILD_TREE = {
  warrior: {
    strength: {
      nodes: ["power_strike", "berserk", "earth_shatter"],
      bonuses: {
        attack: 20,
        hp: 50
      }
    },

    tank: {
      nodes: ["shield_wall", "fortify", "immortal_stance"],
      bonuses: {
        defense: 30,
        hp: 100
      }
    }
  },

  mage: {
    fire: {
      nodes: ["fireball", "meteor", "inferno"],
      bonuses: {
        magic: 25
      }
    },

    shadow: {
      nodes: ["curse", "void_blast", "soul_drain"],
      bonuses: {
        crit: 20
      }
    }
  }
};

function applyBuild(player, path) {

  const tree = BUILD_TREE[player.class]?.[path];

  if (!tree) return player;

  player.skills = tree.nodes;
  player.stats.attack += tree.bonuses.attack || 0;
  player.stats.hp += tree.bonuses.hp || 0;
  player.stats.magic += tree.bonuses.magic || 0;

  return player;
}

module.exports = { BUILD_TREE, applyBuild };