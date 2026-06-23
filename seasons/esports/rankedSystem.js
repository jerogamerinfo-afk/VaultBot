const players = new Map();

function updateMatch(playerId, result) {

  if (!players.has(playerId)) {
    players.set(playerId, { wins: 0, losses: 0, mmr: 1000 });
  }

  const p = players.get(playerId);

  if (result === "win") {
    p.wins++;
    p.mmr += 25;
  } else {
    p.losses++;
    p.mmr -= 15;
  }
}

function getLeaderboard() {
  return [...players.entries()]
    .sort((a, b) => b[1].mmr - a[1].mmr);
}

module.exports = { updateMatch, getLeaderboard };