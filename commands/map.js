const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ZONES } = require("../../world-engine/zones");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("worldmap")
    .setDescription("🌍 Mapa visual AAA"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🌍 WORLD MAP")
      .setImage(ZONES.city.image)
      .setDescription(
        Object.values(ZONES)
          .map(z => `${z.name} (Lvl ${z.level})`)
          .join("\n")
      );

    return interaction.reply({ embeds: [embed] });
  }
};