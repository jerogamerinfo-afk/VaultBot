const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("🏆 Top ricos del server"),

  async execute(interaction, client) {

    const db = client.db;

    const all = await db.all?.() || [];

    const top = all
      .filter(x => x.id.startsWith("coins_"))
      .map(x => ({
        id: x.id.replace("coins_", ""),
        value: Number(x.value || 0)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🏆 TOP RICOS")
      .setDescription(
        top.map((u, i) =>
          `**${i + 1}.** <@${u.id}> — 💰 ${u.value}`
        ).join("\n")
      );

    return interaction.reply({ embeds: [embed] });
  }
};