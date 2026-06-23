const seasons = {
  current: 1,
  leaderboard: []
};

function addWin(playerId) {

  let p = seasons.leaderboard.find(p => p.id === playerId);

  if (!p) {
    p = { id: playerId, wins: 0 };
    seasons.leaderboard.push(p);
  }

  p.wins++;
}

function getRank() {
  return seasons.leaderboard.sort((a,b) => b.wins - a.wins);
}

module.exports = { seasons, addWin, getRank };