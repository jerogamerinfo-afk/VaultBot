const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hub")
    .setDescription("🌍 Mundo MMORPG"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🌍 VAULT ONLINE WORLD")
      .setDescription(
        "🏙️ Ciudad\n🐉 Dungeon\n⚔️ PvP Arena\n💱 Mercado"
      )
      .setColor("Blue");

    return interaction.reply({ embeds: [embed] });
  }
};