const queue = [];

function joinQueue(player) {
  queue.push(player);

  if (queue.length >= 2) {
    const match = queue.splice(0, 2);

    return {
      matchId: Date.now(),
      players: match
    };
  }

  return null;
}

module.exports = { joinQueue };