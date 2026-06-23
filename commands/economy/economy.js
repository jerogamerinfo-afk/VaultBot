const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("economy")
    .setDescription("📊 Estado económico"),

  async execute(interaction, client) {
    const db = client.db;

    const allUsers = await db.all();

    const totalItems = allUsers
      .filter(x => x.id.startsWith("album_"))
      .reduce((acc, v) => acc + (v.value.length || 0), 0);

    const trades = allUsers.filter(x => x.id.startsWith("history_")).length;

    const embed = new EmbedBuilder()
      .setTitle("📊 Economía VaultBot")
      .addFields(
        { name: "📦 Items totales", value: String(totalItems), inline: true },
        { name: "🤝 Trades", value: String(trades), inline: true }
      )
      .setColor("Blue");

    return interaction.reply({ embeds: [embed] });
  }
};