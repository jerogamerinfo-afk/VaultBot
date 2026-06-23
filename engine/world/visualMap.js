const MAP = {
  mondstadt: {
    name: "🌬️ Mondstadt-like Zone",
    color: 0x00ffcc,
    connections: ["dragonspire", "forest"]
  },

  forest: {
    name: "🌲 Whispering Forest",
    color: 0x00ff00,
    connections: ["mondstadt"]
  },

  dragonspire: {
    name: "🐉 Dragon Peak",
    color: 0xff0000,
    connections: ["mondstadt"]
  }
};

module.exports = { MAP };