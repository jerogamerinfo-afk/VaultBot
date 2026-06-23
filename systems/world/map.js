const MAP = {
  town: {
    name: "🏘️ Aldea Central",
    connections: ["forest", "arena"]
  },

  forest: {
    name: "🌲 Bosque Oscuro",
    connections: ["town", "dungeon1"]
  },

  dungeon1: {
    name: "🏰 Dungeon Antiguo",
    connections: ["forest"]
  },

  arena: {
    name: "⚔️ Coliseo PvP",
    connections: ["town"]
  }
};

function canMove(from, to) {
  return MAP[from]?.connections.includes(to);
}

module.exports = { MAP, canMove };