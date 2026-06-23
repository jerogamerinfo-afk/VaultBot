const {
  SlashCommandBuilder
} = require("discord.js");

const {
  fuseCards
} = require("../../utils/fusion");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fuse")
    .setDescription("🔥 Fusionar cartas")
    .addStringOption(o =>
      o.setName("card1")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("card2")
       .setRequired(true)),

  async execute(interaction) {

    const card1 =
      interaction.options.getString("card1");

    const card2 =
      interaction.options.getString("card2");

    const result =
      fuseCards(card1, card2);

    if (!result) {
      return interaction.reply(
        "❌ No existe esa fusión."
      );
    }

    return interaction.reply(
      `🔥 Nueva carta obtenida: **${result}**`
    );
  }
};