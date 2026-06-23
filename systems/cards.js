const CARDS = {
  "Rubius": {
    hp: 120,
    atk: 40,
    skill: "🎯 Meme Strike"
  },
  "Rubius PRO": {
    hp: 160,
    atk: 55,
    skill: "🔥 Rage Content"
  },
  "Rubius GOD": {
    hp: 220,
    atk: 80,
    skill: "💀 Final Roast"
  }
};

function getCardStats(name) {
  return CARDS[name] || {
    hp: 80,
    atk: 20,
    skill: "⚔️ Basic Hit"
  };
}

module.exports = { getCardStats };