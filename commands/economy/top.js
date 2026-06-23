const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("top")
    .setDescription("🏆 Ranking (simulado)"),

  async execute(interaction, client) {

    const db = client.db;

    const users = [];

    for (const [key, value] of db) {
      if (key.startsWith("coins_")) {
        users.push({ id: key.replace("coins_", ""), coins: value });
      }
    }

    users.sort((a, b) => b.coins - a.coins);

    const top = users.slice(0, 5)
      .map((u, i) => `${i + 1}. <@${u.id}> - ${u.coins} coins`)
      .join("\n");

    return interaction.reply(`🏆 TOP:\n${top || "No hay datos"}`);
  }
};