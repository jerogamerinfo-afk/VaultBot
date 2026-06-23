const COMBOS = {
  warrior: {
    light: ["slash_1", "slash_2", "finisher"],
    heavy: ["smash", "delay_smash", "earth_break"]
  }
};

function executeCombo(player, input) {

  const combo = COMBOS[player.class]?.[input.type];

  if (!combo) return null;

  return {
    combo,
    animationSync: true,
    damage: combo.length * 10,
    timingWindow: 300
  };
}

module.exports = { executeCombo };