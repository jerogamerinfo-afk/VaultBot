const MAP = {
  town: {
    name: "🏘️ Aldea Central",
    desc: "Zona segura",
    connections: ["forest", "arena"]
  },

  forest: {
    name: "🌲 Bosque Oscuro",
    desc: "Monstruos débiles",
    connections: ["town", "dungeon"]
  },

  dungeon: {
    name: "🏰 Mazmorra Antigua",
    desc: "Bosses poderosos",
    connections: ["forest"]
  },

  arena: {
    name: "⚔️ Coliseo PvP",
    desc: "Combate entre jugadores",
    connections: ["town"]
  }
};

module.exports = { MAP };