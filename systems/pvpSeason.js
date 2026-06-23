async function addWin(db, userId) {

  let data = await db.get(`season_${userId}`) || {
    wins: 0
  };

  data.wins++;

  await db.set(`season_${userId}`, data);
}

module.exports = { addWin };