const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("💸 Intentar un robo (arriesgado)"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    const success = Math.random() < 0.45;

    if (success) {

      const gain = Math.floor(Math.random() * 500) + 100;

      coins += gain;

      await db.set(`coins_${user.id}`, coins);

      return interaction.reply(
        `🤑 Robo exitoso +${gain} coins`
      );

    } else {

      const loss = Math.floor(Math.random() * 300) + 50;

      coins -= loss;

      await db.set(`coins_${user.id}`, coins);

      return interaction.reply(
        `🚨 Te atraparon -${loss} coins`
      );
    }
  }
};