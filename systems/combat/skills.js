const COOLDOWNS = new Map();

function useSkill(userId, skill) {

  const now = Date.now();
  const cd = COOLDOWNS.get(`${userId}_${skill}`);

  if (cd && now < cd) {
    return { error: "⏳ Skill en cooldown" };
  }

  const damage = {
    slash: 20,
    fireball: 35,
    combo: 60
  };

  const nextCd = now + 5000;
  COOLDOWNS.set(`${userId}_${skill}`, nextCd);

  return {
    damage: damage[skill] || 10,
    combo: skill === "combo"
  };
}

module.exports = { useSkill };