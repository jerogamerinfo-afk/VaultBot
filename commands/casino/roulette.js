const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("🎡 Ruleta")
    .addIntegerOption(option =>
      option
        .setName("bet")
        .setDescription("Cantidad")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("number")
        .setDescription("Número 0-36")
        .setMinValue(0)
        .setMaxValue(36)
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;

    const bet =
      interaction.options.getInteger("bet");

    const number =
      interaction.options.getInteger("number");

    let coins =
      Number(
        await db.get(
          `coins_${interaction.user.id}`
        )
      ) || 0;

    if (coins < bet) {
      return interaction.reply(
        "❌ No tienes suficientes coins."
      );
    }

    const result =
      Math.floor(Math.random() * 37);

    if (result === number) {

      coins += bet * 10;

      await db.set(
        `coins_${interaction.user.id}`,
        coins
      );

      return interaction.reply(
        `🎡 Salió ${result}\n🎉 Ganaste ${bet * 10} coins`
      );
    }

    coins -= bet;

    await db.set(
      `coins_${interaction.user.id}`,
      coins
    );

    return interaction.reply(
      `🎡 Salió ${result}\n💀 Perdiste ${bet} coins`
    );
  }
};