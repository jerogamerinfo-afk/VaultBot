const MISSIONS = [
  {
    id: "fight",
    text: "⚔️ Gana 2 batallas",
    goal: 2,
    reward: 500
  },
  {
    id: "collect",
    text: "🎴 Consigue 10 cartas",
    goal: 10,
    reward: 300
  },
  {
    id: "xp",
    text: "📈 Gana 200 XP",
    goal: 200,
    reward: 400
  }
];

function randomMission() {
  return MISSIONS[Math.floor(Math.random() * MISSIONS.length)];
}

module.exports = { randomMission };