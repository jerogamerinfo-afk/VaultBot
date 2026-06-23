const leaderboard = [];

function addWin(playerId) {

  let p = leaderboard.find(x => x.id === playerId);

  if (!p) {
    p = { id: playerId, wins: 0, losses: 0 };
    leaderboard.push(p);
  }

  p.wins++;
}

function addLoss(playerId) {

  let p = leaderboard.find(x => x.id === playerId);

  if (!p) {
    p = { id: playerId, wins: 0, losses: 0 };
    leaderboard.push(p);
  }

  p.losses++;
}

function getRanked() {
  return leaderboard.sort((a, b) => b.wins - a.wins);
}

module.exports = { addWin, addLoss, getRanked };