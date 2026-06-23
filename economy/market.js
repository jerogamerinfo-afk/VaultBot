const market = [];

function listItem(user, item, price) {

  market.push({
    seller: user,
    item,
    price,
    time: Date.now()
  });
}

function buy(index, buyer) {

  const item = market[index];

  if (!item) return null;

  market.splice(index, 1);

  return {
    buyer,
    item
  };
}

module.exports = { market, listItem, buy };