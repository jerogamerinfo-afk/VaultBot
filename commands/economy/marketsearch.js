const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marketsearch")
    .setDescription("🔎 Buscar cartas en venta")
    .addStringOption(option =>
      option
        .setName("card")
        .setDescription("Nombre de la carta")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const card =
      interaction.options.getString("card");

    let market =
      await db.get("card_market");

    if (!Array.isArray(market))
      market = [];

    const results =
      market.filter(x =>
        x.card.toLowerCase()
          .includes(card.toLowerCase())
      );

    if (results.length === 0) {
      return interaction.reply({
        content:
          "❌ No se encontraron resultados.",
        ephemeral: true
      });
    }

    const embed =
      new EmbedBuilder()
        .setColor("Gold")
        .setTitle(`🔎 Resultados: ${card}`);

    results.slice(0, 10).forEach(r => {
      embed.addFields({
        name: `🆔 ${r.id}`,
        value:
          `🎴 ${r.card}\n💰 ${r.price}\n👤 ${r.sellerTag}`,
        inline: false
      });
    });

    return interaction.reply({
      embeds: [embed]
    });
  }
};