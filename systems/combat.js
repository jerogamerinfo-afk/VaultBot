function fight(a, b) {

  let log = [];

  while (a.hp > 0 && b.hp > 0) {

    const dmgA = Math.max(1, a.attack - b.defense + Math.random() * 10);
    const dmgB = Math.max(1, b.attack - a.defense + Math.random() * 10);

    b.hp -= dmgA;
    log.push(`⚔️ ${a.name} golpea ${Math.floor(dmgA)}`);

    if (b.hp <= 0) break;

    a.hp -= dmgB;
    log.push(`💀 ${b.name} contraataca ${Math.floor(dmgB)}`);
  }

  return {
    winner: a.hp > b.hp ? a.name : b.name,
    log
  };
}

module.exports = { fight };