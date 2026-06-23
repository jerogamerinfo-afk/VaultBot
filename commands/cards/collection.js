const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("collection")
    .setDescription("📚 Ver colección"),

  async execute(interaction, client) {

    const db = client.db;

    const album =
      await db.get(`album_${interaction.user.id}`) || [];

    const fav =
      await db.get(`favorite_${interaction.user.id}`);

    if (!album.length) {
      return interaction.reply({
        content: "📭 No tienes cartas.",
        ephemeral: true
      });
    }

    const embed =
      new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`📚 Colección de ${interaction.user.username}`)
        .setDescription(
          album.map(c => `🎴 ${c}`).join("\n")
        )
        .addFields({
          name: "⭐ Favorita",
          value: fav || "Ninguna"
        })
        .setFooter({
          text: `Total: ${album.length}`
        });

    return interaction.reply({
      embeds: [embed]
    });
  }
};