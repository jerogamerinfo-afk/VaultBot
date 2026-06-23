const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("favoritecard")
    .setDescription("⭐ Elegir carta favorita"),

  async execute(interaction, client) {

    const db = client.db;

    const album =
      await db.get(
        `album_${interaction.user.id}`
      ) || [];

    if (!album.length) {
      return interaction.reply({
        content:
          "❌ No tienes cartas.",
        ephemeral: true
      });
    }

    const menu =
      new StringSelectMenuBuilder()
        .setCustomId("favorite_card")
        .setPlaceholder(
          "Selecciona tu favorita"
        )
        .addOptions(
          album.slice(0, 25).map(card => ({
            label: card,
            value: card,
            emoji: "🎴"
          }))
        );

    const row =
      new ActionRowBuilder()
        .addComponents(menu);

    return interaction.reply({
      content:
        "⭐ Elige tu carta favorita:",
      components: [row],
      ephemeral: true
    });
  }
};