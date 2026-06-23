function combatTick(players, boss) {

  let log = [];

  for (let p of players) {

    if (Math.random() < 0.2) {
      log.push(`💀 ${p.name} esquiva perfectamente`);
      continue;
    }

    const dmg = p.atk + Math.floor(Math.random() * 15);

    boss.hp -= dmg;

    log.push(`⚔️ ${p.name} hace ${dmg}`);
  }

  // boss counter attack
  const target = players[Math.floor(Math.random() * players.length)];

  const bossDmg = boss.atk + Math.random() * 30;

  target.hp -= bossDmg;

  log.push(`🐉 Boss golpea a ${target.name} (${Math.floor(bossDmg)})`);

  return { players, boss, log };
}

module.exports = { combatTick };