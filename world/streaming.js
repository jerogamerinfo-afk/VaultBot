const world = {
  chunks: new Map(),
  players: new Map()
};

function loadChunk(id) {

  if (!world.chunks.has(id)) {
    world.chunks.set(id, {
      npcs: [],
      objects: [],
      players: []
    });
  }

  return world.chunks.get(id);
}

function streamWorld(player) {

  const chunk = loadChunk(player.chunkId);

  return {
    players: chunk.players,
    objects: chunk.objects,
    npcs: chunk.npcs
  };
}

module.exports = { streamWorld };