const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rpgbattle")
    .setDescription("⚔️ Batalla RPG contra otro jugador")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Jugador contra el que luchar")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const target =
      interaction.options.getUser("user");

    const user = interaction.user;

    if (target.id === user.id) {
      return interaction.reply({
        content:
          "❌ No puedes luchar contra ti mismo.",
        ephemeral: true
      });
    }

    const playerPower =
      Math.floor(Math.random() * 100) + 1;

    const enemyPower =
      Math.floor(Math.random() * 100) + 1;

    const winner =
      playerPower >= enemyPower
        ? user
        : target;

    const embed = new EmbedBuilder()
      .setColor(
        winner.id === user.id
          ? "Green"
          : "Red"
      )
      .setTitle("⚔️ Batalla RPG")
      .addFields(
        {
          name: "🛡️ Jugador",
          value: `${user.tag}`,
          inline: true
        },
        {
          name: "⚔️ Rival",
          value: `${target.tag}`,
          inline: true
        },
        {
          name: "🔥 Poder Jugador",
          value: `${playerPower}`,
          inline: true
        },
        {
          name: "💀 Poder Rival",
          value: `${enemyPower}`,
          inline: true
        },
        {
          name: "🏆 Ganador",
          value: `${winner.tag}`
        }
      )
      .setTimestamp();

    return interaction.reply({
      embeds: [embed]
    });
  }
};