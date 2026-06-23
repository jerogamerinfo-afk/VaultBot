const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sellcard")
    .setDescription("🏪 Publicar una carta en el marketplace")
    .addStringOption(option =>
      option
        .setName("card")
        .setDescription("Carta a vender")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("price")
        .setDescription("Precio de venta")
        .setRequired(true)
        .setMinValue(1)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const card =
      interaction.options.getString("card");

    const price =
      interaction.options.getInteger("price");

    let album =
      await db.get(`album_${user.id}`) || [];

    if (!album.includes(card)) {
      return interaction.reply({
        content:
          "❌ No tienes esa carta.",
        ephemeral: true
      });
    }

    // Remover carta del inventario
    const index = album.indexOf(card);

    album.splice(index, 1);

    await db.set(
      `album_${user.id}`,
      album
    );

    // Obtener marketplace
    let market =
      await db.get("card_market");

    if (!Array.isArray(market))
      market = [];

    const listingId =
      Date.now().toString();

    market.push({
      id: listingId,
      seller: user.id,
      sellerTag: user.tag,
      card,
      price,
      createdAt: Date.now()
    });

    await db.set(
      "card_market",
      market
    );

    const embed =
      new EmbedBuilder()
        .setColor("Green")
        .setTitle("🏪 Carta publicada")
        .addFields(
          {
            name: "🎴 Carta",
            value: card,
            inline: true
          },
          {
            name: "💰 Precio",
            value: `${price}`,
            inline: true
          },
          {
            name: "🆔 Listing ID",
            value: listingId,
            inline: false
          }
        );

    return interaction.reply({
      embeds: [embed]
    });
  }
};