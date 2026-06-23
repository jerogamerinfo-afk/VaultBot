const EVENTS = [
  {
    name: "🔥 Invasión del Boss",
    bonusXP: 2,
    bonusCoins: 2
  },
  {
    name: "💀 Noche Oscura",
    bonusXP: 3,
    rareBoost: true
  },
  {
    name: "⚡ Festival de Poder",
    bonusCoins: 3
  }
];

function getEvent() {
  return EVENTS[Math.floor(Math.random() * EVENTS.length)];
}

module.exports = { getEvent };