const {
  SlashCommandBuilder
} = require("discord.js");

const symbols = ["🍒", "🍋", "🍇", "💎", "7️⃣"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("🎰 Máquina tragamonedas")
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

    const roll = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    let result = "💀 Perdiste";

    if (roll[0] === roll[1] && roll[1] === roll[2]) {
      coins += bet * 5;
      result = "🔥 JACKPOT x5!";
    } else if (roll[0] === roll[1] || roll[1] === roll[2]) {
      coins += bet;
      result = "✨ Recuperaste tu apuesta";
    } else {
      coins -= bet;
    }

    await db.set(`coins_${user.id}`, coins);

    return interaction.reply(
      `🎰 ${roll.join(" | ")}\n${result}`
    );
  }
};