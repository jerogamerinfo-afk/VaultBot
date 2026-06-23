const { SlashCommandBuilder } = require("discord.js");
const { getPlayer } = require("../../systems/rpgPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rpgprofile")
    .setDescription("🧠 Ver tu perfil RPG"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const p = await getPlayer(db, user.id);

    return interaction.reply(
      `🧠 **RPG PROFILE**\n\n` +
      `👤 ${user.username}\n` +
      `⭐ Nivel: ${p.level}\n` +
      `📈 XP: ${p.xp}\n` +
      `❤️ HP: ${p.hp}\n` +
      `🏆 Wins: ${p.wins}\n` +
      `💀 Losses: ${p.losses}`
    );
  }
};