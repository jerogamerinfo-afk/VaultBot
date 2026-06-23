const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("🏆 Ranking global"),

  async execute(interaction, client) {

    const db = client.db;

    const all = await db.all?.() || [];

    const top = all
      .filter(x => x.id.startsWith("coins_"))
      .map(x => ({
        id: x.id.replace("coins_", ""),
        value: Number(x.value)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return interaction.reply(
      "🏆 TOP:\n" +
      top.map((u, i) =>
        `${i + 1}. <@${u.id}> - ${u.value}`
      ).join("\n")
    );
  }
};