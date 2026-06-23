const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("🃏 Blackjack")
    .addIntegerOption(option =>
      option
        .setName("bet")
        .setDescription("Apuesta")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;

    const bet =
      interaction.options.getInteger("bet");

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

    const player =
      Math.floor(Math.random() * 11) + 11;

    const dealer =
      Math.floor(Math.random() * 11) + 11;

    let result = "";

    if (player > 21) {

      coins -= bet;
      result = "💀 Te pasaste.";

    } else if (
      dealer > 21 ||
      player > dealer
    ) {

      coins += bet;
      result = "🎉 Ganaste.";

    } else if (player < dealer) {

      coins -= bet;
      result = "💀 Perdiste.";

    } else {

      result = "⚖️ Empate.";
    }

    await db.set(
      `coins_${interaction.user.id}`,
      coins
    );

    return interaction.reply(
      `🃏 Tú: ${player}\n🤖 Dealer: ${dealer}\n\n${result}`
    );
  }
};