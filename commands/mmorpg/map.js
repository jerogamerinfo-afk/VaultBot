const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ZONES } = require("../../world/zones");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mmomap")
    .setDescription("🌍 Mapa del mundo"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🌍 WORLD MAP")
      .setDescription(
        Object.values(ZONES)
          .map(z => `📍 ${z.name} (Lv ${z.level})`)
          .join("\n")
      )
      .setImage(ZONES.city.image);

    return interaction.reply({ embeds: [embed] });
  }
};