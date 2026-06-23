const { SlashCommandBuilder } = require("discord.js");
const { getPlayer } = require("../../systems/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mmoprofile")
    .setDescription("👤 Perfil MMORPG"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const p = await getPlayer(db, user.id);

    return interaction.reply(
      `👤 **${user.username}**\n\n` +
      `⭐ Nivel: ${p.level}\n` +
      `❤️ HP: ${p.hp}\n` +
      `⚔️ ATK: ${p.attack}\n` +
      `🛡️ DEF: ${p.defense}\n` +
      `💰 Oro: ${p.gold}\n` +
      `🏆 Wins: ${p.wins}\n` +
      `🌍 Zona: ${p.zone}`
    );
  }
};