const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("👤 Ver tu perfil"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    const bank =
      Number(await db.get(`bank_${user.id}`)) || 0;

    const album =
      await db.get(`album_${user.id}`) || [];

    const favorite =
      await db.get(`favorite_${user.id}`) || "Ninguna";

    const embed =
      new EmbedBuilder()
        .setColor("Gold")
        .setTitle(`👤 Perfil de ${user.username}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          {
            name: "💰 Wallet",
            value: `${coins}`,
            inline: true
          },
          {
            name: "🏦 Banco",
            value: `${bank}`,
            inline: true
          },
          {
            name: "🎴 Cartas",
            value: `${album.length}`,
            inline: true
          },
          {
            name: "⭐ Favorita",
            value: favorite,
            inline: false
          }
        );

    return interaction.reply({
      embeds: [embed]
    });
  }
};