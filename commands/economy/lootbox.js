const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lootbox")
    .setDescription("🎁 Abrir lootbox"),

  async execute(interaction, client) {

    const items = ["100 coins", "card", "nothing", "boost"];

    const result =
      items[Math.floor(Math.random() * items.length)];

    return interaction.reply(`🎁 Lootbox: ${result}`);
  }
};