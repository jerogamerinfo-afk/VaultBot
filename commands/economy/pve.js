const { SlashCommandBuilder } = require("discord.js");
const { getCardStats } = require("../../systems/cards");

const ENEMIES = [
  { name: "Bot Noob", hp: 100, atk: 15 },
  { name: "Bot Pro", hp: 160, atk: 30 },
  { name: "Boss Vault", hp: 300, atk: 60 }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pve")
    .setDescription("🧠 Batalla contra IA"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let album = await db.get(`album_${user.id}`) || [];
    if (!album.length)
      return interaction.reply("❌ No tienes cartas.");

    const enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    const card = getCardStats(album[Math.floor(Math.random() * album.length)]);

    let hpUser = card.hp;
    let hpEnemy = enemy.hp;

    let log = [];

    while (hpUser > 0 && hpEnemy > 0) {

      hpEnemy -= card.atk;
      log.push(`⚔️ Atacas con ${card.skill}`);

      if (hpEnemy <= 0) break;

      hpUser -= enemy.atk;
      log.push(`💀 ${enemy.name} contraataca`);
    }

    const win = hpUser > hpEnemy;

    if (win) {
      await db.set(`coins_${user.id}`,
        (await db.get(`coins_${user.id}`) || 0) + 200
      );
    }

    return interaction.reply(
      `🧠 **PVE - ${enemy.name}**\n\n` +
      `🏆 ${win ? "VICTORIA" : "DERROTA"}\n\n` +
      log.join("\n")
    );
  }
};