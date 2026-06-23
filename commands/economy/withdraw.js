const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("💸 Retirar dinero del banco")
    .addIntegerOption(o =>
      o.setName("amount")
        .setDescription("Cantidad")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const amount =
      interaction.options.getInteger("amount");

    let bank =
      Number(await db.get(`bank_${user.id}`)) || 0;

    if (bank < amount) {
      return interaction.reply("❌ No tienes suficiente en el banco.");
    }

    let coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    await db.set(`bank_${user.id}`, bank - amount);
    await db.set(`coins_${user.id}`, coins + amount);

    return interaction.reply(`💸 Retiraste ${amount} coins.`);
  }
};