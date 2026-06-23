async function getPlayer(db, userId) {

  let p = await db.get(`mmo_${userId}`);

  if (!p) {
    p = {
      level: 1,
      xp: 0,
      hp: 100,
      mana: 50,
      class: "novato",
      zone: "inicio",
      gold: 0,
      attack: 10,
      defense: 5,
      wins: 0
    };

    await db.set(`mmo_${userId}`, p);
  }

  return p;
}

module.exports = { getPlayer };