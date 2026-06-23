const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tradehistory")
    .setDescription("📊 Ver historial de trades"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const history = await db.get(`history_${user.id}`) || [];

    if (!history.length) {
      return interaction.reply({
        content: "📭 No tienes trades.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("📊 Historial de Trades")
      .setDescription(
        history.slice(-10).map(h =>
          `🤝 Con <@${h.with}> | ${h.gave} ➜ ${h.got}`
        ).join("\n")
      );

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
};