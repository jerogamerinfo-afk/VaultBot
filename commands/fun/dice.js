const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("🎲 Duelo de dados")
    .addIntegerOption(o =>
      o.setName("bet")
        .setDescription("Apuesta")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const bet =
      interaction.options.getInteger("bet");

    let coins =
      Number(await db.get(`coins_${user.id}`)) || 0;

    if (coins < bet) {
      return interaction.reply("❌ No tienes coins.");
    }

    const userRoll = Math.floor(Math.random() * 6) + 1;
    const botRoll = Math.floor(Math.random() * 6) + 1;

    let result;

    if (userRoll > botRoll) {
      coins += bet;
      result = "🎉 Ganaste";
    } else if (userRoll < botRoll) {
      coins -= bet;
      result = "💀 Perdiste";
    } else {
      result = "⚖️ Empate";
    }

    await db.set(`coins_${user.id}`, coins);

    return interaction.reply(
      `🎲 Tú: ${userRoll} | Bot: ${botRoll}\n${result}`
    );
  }
};