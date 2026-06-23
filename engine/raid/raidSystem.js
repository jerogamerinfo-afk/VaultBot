function startRaid(players) {

  const boss = {
    name: "🐉 World Destroyer",
    hp: 10000,
    atk: 80
  };

  let log = [];

  for (let round = 0; round < 12; round++) {

    for (let p of players) {

      if (boss.hp <= 0) break;

      const dmg = p.level * 12 + Math.random() * 30;
      boss.hp -= dmg;

      log.push(`⚔️ ${p.name} ataca (${Math.floor(dmg)})`);
    }

    if (boss.hp > 0) {

      for (let p of players) {
        p.hp -= boss.atk;
      }
    }
  }

  return {
    win: boss.hp <= 0,
    log
  };
}

module.exports = { startRaid };