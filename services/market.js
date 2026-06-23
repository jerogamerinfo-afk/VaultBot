const market = [];

function listItem(seller, item, price) {

  market.push({
    seller,
    item,
    price,
    time: Date.now()
  });
}

function buyItem(buyer, index) {

  const offer = market[index];

  if (!offer) return null;

  market.splice(index, 1);

  return offer;
}

module.exports = { listItem, buyItem };