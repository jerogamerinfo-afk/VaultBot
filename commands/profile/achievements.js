const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("🏆 Ver logros"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    const album =
      await db.get(`album_${user.id}`) || [];

    const achievements = [];

    if (coins >= 1000)
      achievements.push("💰 Millonario I");

    if (coins >= 10000)
      achievements.push("💎 Millonario II");

    if (album.length >= 1)
      achievements.push("🎴 Primera Carta");

    if (album.length >= 25)
      achievements.push("📚 Coleccionista");

    if (await db.get(`daily_${user.id}`))
      achievements.push("🎁 Daily Reclamado");

    if (await db.get(`favorite_${user.id}`))
      achievements.push("⭐ Carta Favorita");

    const embed =
      new EmbedBuilder()
        .setColor("Purple")
        .setTitle("🏆 Logros")
        .setDescription(
          achievements.length
            ? achievements.join("\n")
            : "Todavía no tienes logros."
        );

    return interaction.reply({
      embeds: [embed]
    });
  }
};