let seasonData = {};

function addWin(userId) {

  if (!seasonData[userId]) {
    seasonData[userId] = { wins: 0 };
  }

  seasonData[userId].wins++;
}

function resetSeason() {
  seasonData = {};
}

function leaderboard() {
  return Object.entries(seasonData)
    .sort((a, b) => b[1].wins - a[1].wins);
}

module.exports = { addWin, resetSeason, leaderboard };