module.exports = {
  async lock(db, tradeId, items) {
    await db.set(`escrow_${tradeId}`, {
      items,
      locked: true
    });
  },

  async release(db, tradeId) {
    await db.delete(`escrow_${tradeId}`);
  }
};