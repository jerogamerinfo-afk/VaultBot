function battle(p1, p2) {

  let hp1 = p1.hp;
  let hp2 = p2.hp;

  const log = [];

  while (hp1 > 0 && hp2 > 0) {

    const dmg1 = Math.floor(Math.random() * 20) + p1.level * 2;
    const dmg2 = Math.floor(Math.random() * 20) + p2.level * 2;

    hp2 -= dmg1;
    log.push(`⚔️ ${p1.name} golpea ${dmg1}`);

    if (hp2 <= 0) break;

    hp1 -= dmg2;
    log.push(`⚔️ ${p2.name} contraataca ${dmg2}`);
  }

  return {
    winner: hp1 > hp2 ? p1.name : p2.name,
    log
  };
}

module.exports = { battle };