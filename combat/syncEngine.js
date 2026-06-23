function syncCombat(io, data) {

  io.emit("combat_sync", {
    player: data.playerId,
    animation: data.combo,
    timestamp: Date.now()
  });
}

module.exports = { syncCombat };