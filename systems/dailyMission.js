const MISSIONS = [
  {
    id: "collect_cards",
    text: "🎴 Consigue 5 cartas",
    goal: 5,
    reward: 500
  },
  {
    id: "use_spin",
    text: "🎡 Usa /spin 3 veces",
    goal: 3,
    reward: 400
  },
  {
    id: "win_battle",
    text: "⚔️ Gana 1 batalla",
    goal: 1,
    reward: 700
  }
];

function getRandomMission() {
  return MISSIONS[Math.floor(Math.random() * MISSIONS.length)];
}

module.exports = { getRandomMission };