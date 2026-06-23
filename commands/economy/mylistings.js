const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mylistings")
    .setDescription("📦 Ver tus ventas activas"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let market =
      await db.get("card_market");

    if (!Array.isArray(market))
      market = [];

    const listings =
      market.filter(x => x.seller === user.id);

    if (listings.length === 0) {
      return interaction.reply({
        content:
          "📦 No tienes ventas activas.",
        ephemeral: true
      });
    }

    const embed =
      new EmbedBuilder()
        .setColor("Blue")
        .setTitle("📦 Tus Listings");

    listings.forEach(l => {
      embed.addFields({
        name: `🆔 ${l.id}`,
        value: `🎴 ${l.card} - 💰 ${l.price}`,
        inline: false
      });
    });

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};