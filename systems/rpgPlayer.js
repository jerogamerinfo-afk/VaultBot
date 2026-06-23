async function getPlayer(db, userId) {

  let player = await db.get(`rpg_${userId}`);

  if (!player) {
    player = {
      level: 1,
      xp: 0,
      hp: 100,
      coins: 0,
      wins: 0,
      losses: 0
    };

    await db.set(`rpg_${userId}`, player);
  }

  return player;
}

module.exports = { getPlayer };