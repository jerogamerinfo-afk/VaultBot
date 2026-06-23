const CLASSES = {
  warrior: { level: 1 },
  mage: { level: 1 },

  assassin: { level: 10 },
  paladin: { level: 15 },
  necromancer: { level: 20 }
};

function canUnlock(player, className) {
  return player.level >= (CLASSES[className]?.level || 999);
}

module.exports = { canUnlock };