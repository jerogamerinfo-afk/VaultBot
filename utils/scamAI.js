module.exports = {
  check(listing, history = []) {

    // 🚨 precio sospechosamente bajo
    if (listing.price < 90 ) {
      return "⚠️ Precio sospechoso";
    }

    // 🚨 spam seller
    const count = history.filter(x => x.seller === listing.seller).length;
    if (count > 5) {
      return "🚨 posible spam seller";
    }

    return "ok";
  }
};