class GameEngine {

  constructor(db) {
    this.db = db;
  }

  async getPlayer(id) {

    let p = await this.db.get(`player_${id}`);

    if (!p) {
      p = {
        level: 1,
        xp: 0,
        hp: 100,
        mana: 50,
        atk: 10,
        def: 5,
        zone: "town",
        class: "novice"
      };

      await this.db.set(`player_${id}`, p);
    }

    return p;
  }

  async addXP(id, amount) {

    const p = await this.getPlayer(id);

    p.xp += amount;

    const needed = p.level * 120;

    if (p.xp >= needed) {
      p.level++;
      p.xp = 0;
      p.hp += 20;
      p.atk += 3;
      p.def += 2;
    }

    await this.db.set(`player_${id}`, p);
    return p;
  }
}

module.exports = GameEngine;