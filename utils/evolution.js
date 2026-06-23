function evolveCard(name) {

  const evolutions = {
    // 🎭 Rubius line
    "Rubius": "Rubius PRO",
    "Rubius PRO": "Rubius GOD",
    "Rubius GOD": "Rubius PRIME",

    // 🎮 Jero line
    "Jero Gamer": "Jero Gamer PRO",
    "Jero Gamer PRO": "Jero Gamer GOD",
    "Jero Gamer GOD": "Jero Gamer ULTRA",

    // 💪 MrBeast line
    "MrBeast": "MrBeast PRIME",
    "MrBeast PRIME": "MrBeast LEGEND",
    "MrBeast LEGEND": "MrBeast INFINITY",

    // 🎤 Ibai line
    "Ibai": "Ibai MAX",
    "Ibai MAX": "Ibai GOD",
    "Ibai GOD": "Ibai TITAN"
  };

  return evolutions[name] || name;
}

module.exports = { evolveCard };