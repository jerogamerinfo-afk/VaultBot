const skillTree = {
  warrior: {
    nodes: {
      strength: {
        damage: 10,
        hp: 20
      },
      berserker: {
        damage: 25,
        crit: 5
      }
    }
  },

  mage: {
    nodes: {
      fire: {
        damage: 15,
        burn: true
      },
      ice: {
        slow: true,
        control: 20
      }
    }
  }
};

function applyNode(player, classType, node) {

  const skill = skillTree[classType]?.nodes[node];

  if (!skill) return player;

  Object.assign(player.stats, skill);

  return player;
}

module.exports = { skillTree, applyNode };