const world = {
  zones: {
    city: { players: [], events: ["police_chase"] },
    forest: { players: [], events: ["boss_spawn"] },
    desert: { players: [], events: ["sandstorm"] }
  },

  players: {}
};

function movePlayer(id, zone) {
  world.players[id] = zone;

  Object.values(world.zones).forEach(z => {
    z.players = z.players.filter(p => p !== id);
  });

  world.zones[zone].players.push(id);
}

module.exports = { world, movePlayer };