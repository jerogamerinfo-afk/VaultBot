const WORLD = {
  town: { name: "🏘️ Capital", level: 1 },
  forest: { name: "🌲 Dark Forest", level: 5 },
  desert: { name: "🏜️ Abyss Desert", level: 10 },
  dungeon: { name: "🏰 Ancient Dungeon", level: 20 }
};

function canEnter(player, zone) {
  return player.level >= WORLD[zone].level;
}

module.exports = { WORLD, canEnter };