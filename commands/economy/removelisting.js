const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removelisting")
    .setDescription("🗑️ Eliminar una venta")
    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID del listing")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const id =
      interaction.options.getString("id");

    let market =
      await db.get("card_market");

    if (!Array.isArray(market))
      market = [];

    const listing =
      market.find(x => x.id === id);

    if (!listing) {
      return interaction.reply({
        content:
          "❌ Listing no encontrado.",
        ephemeral: true
      });
    }

    if (listing.seller !== user.id) {
      return interaction.reply({
        content:
          "❌ No es tu publicación.",
        ephemeral: true
      });
    }

    // devolver carta al usuario
    let album =
      await db.get(`album_${user.id}`) || [];

    album.push(listing.card);

    await db.set(
      `album_${user.id}`,
      album
    );

    // eliminar listing
    market =
      market.filter(x => x.id !== id);

    await db.set("card_market", market);

    return interaction.reply({
      content:
        "🗑️ Listing eliminado y carta devuelta.",
      ephemeral: true
    });
  }
};