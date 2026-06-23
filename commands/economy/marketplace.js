const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("market")
    .setDescription("🏪 Ver marketplace global"),

  async execute(interaction, client) {
    const db = client.db;

    const listings = await db.get("market") || [];

    if (!listings.length) {
      return interaction.reply({
        content: "🏪 Marketplace vacío",
        ephemeral: true
      });
    }

    const text = listings
      .slice(0, 10)
      .map(l => `🆔 ${l.id} | ${l.item} | 💰 ${l.price}`)
      .join("\n");

    return interaction.reply({
      content: `🏪 MARKETPLACE\n\n${text}`,
      ephemeral: true
    });
  }
};