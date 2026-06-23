const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("✨ Mejora una carta aleatoria de tu colección"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let album = await db.get(`album_${user.id}`);

    if (!Array.isArray(album) || album.length === 0) {
      return interaction.reply("❌ No tienes cartas.");
    }

    const index = Math.floor(Math.random() * album.length);

    album[index] = `⭐ ${album[index]}`;

    await db.set(`album_${user.id}`, album);

    return interaction.reply(
      `✨ Has mejorado una carta de tu colección!`
    );
  }
};