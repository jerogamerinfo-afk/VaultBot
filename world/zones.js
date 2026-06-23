const ZONES = {
  city: {
    name: "🏙️ Neo City",
    level: 1,
    events: ["robbery", "npc_mission"],
    image: "/assets/city.png"
  },

  slums: {
    name: "🔥 Underground Slums",
    level: 10,
    events: ["gang_war", "boss_spawn"],
    image: "/assets/slums.png"
  },

  abyss: {
    name: "🐉 Abyss Dungeon",
    level: 30,
    events: ["raid_boss"],
    image: "/assets/abyss.png"
  }
};

module.exports = { ZONES };