const { evolveCard } = require("../utils/evolution");

async function checkEvolution(db, userId) {

  let album = await db.get(`album_${userId}`);
  if (!Array.isArray(album)) return [];

  const count = {};

  for (const c of album) {
    count[c] = (count[c] || 0) + 1;
  }

  const updated = [];

  for (let card in count) {

    let finalCard = card;

    if (count[card] >= 3) {
      finalCard = evolveCard(card);
    }

    updated.push(finalCard);
  }

  await db.set(`album_${userId}`, updated);

  return updated;
}

module.exports = { checkEvolution };