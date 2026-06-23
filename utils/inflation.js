module.exports = {
  async run(db) {

    let allCoins = await db.get("global_coins") || 100000;

    let inflation = 1 + (allCoins / 1000000);

    let market = await db.get("market") || [];

    market = market.map(item => {
      return {
        ...item,
        price: Math.floor(item.price * inflation)
      };
    });

    await db.set("market", market);

    console.log("📈 inflación aplicada:", inflation);
  }
};