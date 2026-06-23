const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("📊 Tus estadísticas"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    const bank =
      Number(await db.get(`bank_${user.id}`)) || 0;

    const cards =
      (await db.get(`album_${user.id}`)) || [];

    const uses =
      Object.keys(await db.all?.() || {})
        .length || 0;

    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle(`📊 Stats de ${user.username}`)
      .addFields(
        { name: "💰 Coins", value: `${coins}`, inline: true },
        { name: "🏦 Banco", value: `${bank}`, inline: true },
        { name: "🎴 Cartas", value: `${cards.length}`, inline: true }
      );

    return interaction.reply({ embeds: [embed] });
  }
};