const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tradehistory")
    .setDescription("📜 Ver tu historial de trades"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let history =
      await db.get(`tradehistory_${user.id}`);

    if (!Array.isArray(history))
      history = [];

    if (history.length === 0) {
      return interaction.reply({
        content:
          "📜 No tienes historial todavía.",
        ephemeral: true
      });
    }

    const embed =
      new EmbedBuilder()
        .setColor("Gold")
        .setTitle("📜 Trade History")
        .setDescription(
          history.slice(0, 15).join("\n")
        );

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};