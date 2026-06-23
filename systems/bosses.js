const BOSSES = [
  { name: "🔥 Inferno Dragon", hp: 1000, atk: 40 },
  { name: "💀 Void King", hp: 1500, atk: 60 },
  { name: "⚡ Titan God", hp: 2000, atk: 80 }
];

function getBoss() {
  return BOSSES[Math.floor(Math.random() * BOSSES.length)];
}

module.exports = { getBoss };