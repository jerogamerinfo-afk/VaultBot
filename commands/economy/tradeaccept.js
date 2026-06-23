const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tradeaccept")
    .setDescription("🤝 Aceptar trade con UI segura"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const trade = await db.get(`trade_${user.id}`);

    if (!trade) {
      return interaction.reply({
        content: "❌ No tienes trades pendientes.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("🤝 Trade solicitado")
      .addFields(
        { name: "📤 Te ofrecen", value: trade.offer, inline: true },
        { name: "📥 Quieren", value: trade.request, inline: true }
      )
      .setFooter({ text: "Confirma con los botones" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`trade_accept_${user.id}`)
        .setLabel("✅ Aceptar")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`trade_cancel_${user.id}`)
        .setLabel("❌ Cancelar")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
};