const tiers = ["common", "rare", "epic", "legendary", "mythic"];

module.exports = {
  evolve(item) {
    const index = tiers.indexOf(item);
    if (index === -1 || index >= tiers.length - 1) return item;
    return tiers[index + 1];
  },

  getTiers() {
    return tiers;
  }
};