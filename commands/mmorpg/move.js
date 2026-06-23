const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const ZONES = {
  ciudad: "🏙️ Ciudad Central",
  bosque: "🌲 Bosque Esmeralda",
  desierto: "🏜️ Desierto Dorado",
  montana: "⛰️ Montañas Eternas",
  volcan: "🌋 Volcán Carmesí",
  oceano: "🌊 Océano Profundo"
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription("🗺️ Moverte por el mundo MMORPG")
    .addStringOption(option =>
      option
        .setName("zone")
        .setDescription("Zona a la que deseas viajar")
        .setRequired(true)
        .addChoices(
          { name: "🏙️ Ciudad Central", value: "ciudad" },
          { name: "🌲 Bosque Esmeralda", value: "bosque" },
          { name: "🏜️ Desierto Dorado", value: "desierto" },
          { name: "⛰️ Montañas Eternas", value: "montana" },
          { name: "🌋 Volcán Carmesí", value: "volcan" },
          { name: "🌊 Océano Profundo", value: "oceano" }
        )
    ),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const zone = interaction.options.getString("zone");

    await db.set(`location_${user.id}`, zone);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🗺️ Viaje completado")
      .setDescription(
        `Has viajado a **${ZONES[zone]}**`
      )
      .setFooter({
        text: `Viajero: ${user.tag}`
      })
      .setTimestamp();

    return interaction.reply({
      embeds: [embed]
    });
  }
};