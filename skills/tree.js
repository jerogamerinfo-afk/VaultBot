const SKILL_TREE = {
  warrior: {
    branches: {
      fury: ["slash", "rage", "berserk"],
      tank: ["block", "fortify", "ironWall"]
    }
  },

  mage: {
    branches: {
      fire: ["fireball", "meteor", "inferno"],
      ice: ["freeze", "blizzard", "timeLock"]
    }
  }
};

function unlockSkill(player, skill) {

  if (!player.skills) player.skills = [];

  if (!player.skills.includes(skill)) {
    player.skills.push(skill);
  }

  return player;
}

module.exports = { SKILL_TREE, unlockSkill };