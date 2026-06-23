const queue = [];

function joinQueue(user) {

  queue.push(user);

  if (queue.length >= 5) {
    const party = queue.splice(0, 5);
    return startRaid(party);
  }

  return null;
}

function startRaid(party) {

  return {
    boss: "🐉 Dragon Supremo",
    players: party,
    status: "STARTED"
  };
}

module.exports = { joinQueue };