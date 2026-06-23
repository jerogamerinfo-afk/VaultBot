function combatAction(playerAction, bossAction, timingDiff) {

  // Perfect parry window (Elden Ring style)
  if (playerAction === "parry" && timingDiff < 150) {
    return {
      result: "PERFECT_PARRY",
      damage: bossAction.damage * 2
    };
  }

  if (playerAction === "dodge" && timingDiff < 200) {
    return {
      result: "DODGE_SUCCESS",
      damage: 0
    };
  }

  return {
    result: "HIT",
    damage: bossAction.damage
  };
}

module.exports = { combatAction };