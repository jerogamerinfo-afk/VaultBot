function getLoot() {

  const loot = [
    { item: "💰 Gold", amount: 50 },
    { item: "💰 Gold", amount: 100 },
    { item: "🧪 Poción HP", amount: 1 },
    { item: "⚔️ Espada rara", amount: 1 }
  ];

  return loot[Math.floor(Math.random() * loot.length)];
}

module.exports = { getLoot };