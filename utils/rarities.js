const rarities = {
  "Rubius": "Rare",
  "Rubius PRO": "Epic",
  "Rubius GOD": "Legendary",
  "Rubius PRIME": "Mythic",

  "Jero Gamer": "Rare",
  "Jero Gamer PRO": "Epic",
  "Jero Gamer GOD": "Legendary",
  "Jero Gamer ULTRA": "Mythic",

  "MrBeast": "Epic",
  "MrBeast PRIME": "Legendary",
  "MrBeast LEGEND": "Mythic",
  "MrBeast INFINITY": "Divine",

  "Ibai": "Rare",
  "Ibai MAX": "Epic",
  "Ibai GOD": "Legendary",
  "Ibai TITAN": "Mythic"
};

function getRarity(card) {
  return rarities[card] || "Common";
}

module.exports = { getRarity };