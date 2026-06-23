async function shouldEvolve(db, userId, card) {

  const uses =
    await db.get(`uses_${userId}_${card}`) || 0;

  if (uses >= 25) return true;

  return false;
}

module.exports = { shouldEvolve };