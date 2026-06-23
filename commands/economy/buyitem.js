const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buyitem")
    .setDescription("🛒 Comprar una carta del marketplace")
    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID de la publicación")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const buyer = interaction.user;

    const listingId =
      interaction.options.getString("id");

    let market =
      await db.get("card_market");

    if (!Array.isArray(market))
      market = [];

    const listing =
      market.find(x => x.id === listingId);

    if (!listing) {
      return interaction.reply({
        content:
          "❌ Publicación no encontrada.",
        ephemeral: true
      });
    }

    if (listing.seller === buyer.id) {
      return interaction.reply({
        content:
          "❌ No puedes comprar tu propia carta.",
        ephemeral: true
      });
    }

    let buyerCoins =
      Number(
        await db.get(`coins_${buyer.id}`)
      ) || 0;

    if (buyerCoins < listing.price) {
      return interaction.reply({
        content:
          "❌ No tienes suficientes VaultCoins.",
        ephemeral: true
      });
    }

    // Comisión marketplace (5%)
    const fee =
      Math.floor(listing.price * 0.05);

    const sellerAmount =
      listing.price - fee;

    // Quitar dinero comprador
    buyerCoins -= listing.price;

    await db.set(
      `coins_${buyer.id}`,
      buyerCoins
    );

    // Dar dinero vendedor
    let sellerCoins =
      Number(
        await db.get(
          `coins_${listing.seller}`
        )
      ) || 0;

    sellerCoins += sellerAmount;

    await db.set(
      `coins_${listing.seller}`,
      sellerCoins
    );

    // Dar carta comprador
    let buyerAlbum =
      await db.get(
        `album_${buyer.id}`
      ) || [];

    buyerAlbum.push(listing.card);

    await db.set(
      `album_${buyer.id}`,
      buyerAlbum
    );

    // Historial comprador
    let buyerHistory =
      await db.get(
        `tradehistory_${buyer.id}`
      ) || [];

    buyerHistory.unshift(
      `🛒 Compró ${listing.card} por ${listing.price}`
    );

    buyerHistory =
      buyerHistory.slice(0, 20);

    await db.set(
      `tradehistory_${buyer.id}`,
      buyerHistory
    );

    // Historial vendedor
    let sellerHistory =
      await db.get(
        `tradehistory_${listing.seller}`
      ) || [];

    sellerHistory.unshift(
      `💰 Vendió ${listing.card} por ${listing.price}`
    );

    sellerHistory =
      sellerHistory.slice(0, 20);

    await db.set(
      `tradehistory_${listing.seller}`,
      sellerHistory
    );

    // Eliminar publicación
    market =
      market.filter(
        x => x.id !== listingId
      );

    await db.set(
      "card_market",
      market
    );

    // Intentar DM vendedor
    try {

      const seller =
        await client.users.fetch(
          listing.seller
        );

      await seller.send(
        `💰 Tu carta **${listing.card}** fue vendida por ${listing.price} VaultCoins.\n\nRecibiste ${sellerAmount} después de la comisión del marketplace.`
      );

    } catch {}

    const embed =
      new EmbedBuilder()
        .setColor("Green")
        .setTitle("🛒 Compra completada")
        .addFields(
          {
            name: "🎴 Carta",
            value: listing.card,
            inline: true
          },
          {
            name: "💰 Precio",
            value: `${listing.price}`,
            inline: true
          },
          {
            name: "🏪 Comisión",
            value: `${fee}`,
            inline: true
          },
          {
            name: "👤 Vendedor",
            value: listing.sellerTag,
            inline: false
          }
        )
        .setTimestamp();

    return interaction.reply({
      embeds: [embed]
    });
  }
};