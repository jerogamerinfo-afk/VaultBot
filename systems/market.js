async function createOffer(db, sellerId, item, price) {

  const offer = {
    sellerId,
    item,
    price
  };

  let market = await db.get("market") || [];
  market.push(offer);

  await db.set("market", market);
}

module.exports = { createOffer };