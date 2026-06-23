const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("🙏 Pedir dinero"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const gain =
      Math.floor(Math.random() * 100) + 10;

    let coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    coins += gain;

    await db.set(`coins_${user.id}`, coins);

    return interaction.reply(
      `🙏 Te dieron ${gain} coins`
    );
  }
};