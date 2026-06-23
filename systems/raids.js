function runRaid(players) {

  let bossHp = 5000;
  let log = [];

  for (let turn = 0; turn < 10; turn++) {

    for (const p of players) {

      if (bossHp <= 0) break;

      const dmg = p.level * 10 + Math.random() * 30;

      bossHp -= dmg;

      log.push(`⚔️ ${p.name} hace ${Math.floor(dmg)}`);
    }

    if (bossHp > 0) {
      for (const p of players) {
        p.hp -= 30;
      }
    }
  }

  return {
    win: bossHp <= 0,
    log
  };
}

module.exports = { runRaid };