const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cardmarket")
    .setDescription("🏪 Publicar carta en marketplace")
    .addStringOption(option =>
      option
        .setName("card")
        .setDescription("Carta a vender")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("price")
        .setDescription("Precio")
        .setRequired(true)
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

    // quitar carta temporalmente
    album.splice(
      album.indexOf(card),
      1
    );

    await db.set(
      `album_${user.id}`,
      album
    );

    let market =
      await db.get("card_market") || [];

    market.push({
      id: Date.now(),
      seller: user.id,
      sellerTag: user.tag,
      card,
      price
    });

    await db.set(
      "card_market",
      market
    );

    return interaction.reply({
      content:
        `🏪 Publicaste **${card}** por ${price} VaultCoins.`
    });
  }
};