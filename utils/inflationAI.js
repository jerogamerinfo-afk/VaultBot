module.exports = {
  async update(db) {
    const market = await db.get("market_items") || [];

    const demand = market.length;

    let inflation = 1;

    if (demand > 200) inflation = 1.4;
    else if (demand > 100) inflation = 1.2;
    else if (demand < 30) inflation = 0.9;

    await db.set("global_inflation", inflation);
  }
};