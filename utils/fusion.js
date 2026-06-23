function fuseCards(card1, card2) {

  const fusions = {

    "Rubius GOD+Ibai GOD":
      "Streamer Supreme",

    "MrBeast LEGEND+Rubius PRIME":
      "YouTube Emperor",

    "Jero Gamer ULTRA+Rubius PRIME":
      "Vault Master"
  };

  const key1 = `${card1}+${card2}`;
  const key2 = `${card2}+${card1}`;

  return fusions[key1] || fusions[key2] || null;
}

module.exports = { fuseCards };