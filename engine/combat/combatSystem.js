function fight(players, boss) {

  let log = [];

  while (boss.hp > 0 && players.some(p => p.hp > 0)) {

    // jugadores atacan
    for (let p of players) {

      if (p.hp <= 0) continue;

      const dmg = p.atk + Math.floor(Math.random() * 10);
      boss.hp -= dmg;

      log.push(`⚔️ ${p.name} hace ${dmg}`);

      if (boss.hp <= 0) break;
    }

    // boss ataca
    const target = players[Math.floor(Math.random() * players.length)];

    const dmgBoss = boss.atk + Math.floor(Math.random() * 25);
    target.hp -= dmgBoss;

    log.push(`🐉 Boss ataca a ${target.name} (${dmgBoss})`);
  }

  return {
    win: boss.hp <= 0,
    log
  };
}

module.exports = { fight };