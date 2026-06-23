function runDungeon(party) {

  let hp = party.map(p => ({
    name: p.name,
    hp: 100 + p.level * 10
  }));

  let bossHP = 500;

  let log = [];

  while (bossHP > 0 && hp.some(p => p.hp > 0)) {

    for (let p of hp) {

      if (p.hp <= 0) continue;

      const dmg = 10 + Math.floor(Math.random() * 20);

      bossHP -= dmg;
      log.push(`⚔️ ${p.name} hace ${dmg}`);

      if (bossHP <= 0) break;

      const bossDmg = 15 + Math.floor(Math.random() * 25);

      p.hp -= bossDmg;
      log.push(`🐉 Boss ataca a ${p.name} (${bossDmg})`);
    }
  }

  return {
    win: bossHP <= 0,
    log
  };
}

module.exports = { runDungeon };