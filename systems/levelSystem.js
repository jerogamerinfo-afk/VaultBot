async function addXP(db, userId, amount) {

  let player = await db.get(`rpg_${userId}`);
  if (!player) return;

  player.xp += amount;

  let needed = player.level * 100;

  while (player.xp >= needed) {
    player.xp -= needed;
    player.level += 1;

    player.hp += 20;

    needed = player.level * 100;
  }

  await db.set(`rpg_${userId}`, player);
  return player;
}

module.exports = { addXP };