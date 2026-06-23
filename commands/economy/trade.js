const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trade")
    .setDescription("🤝 Enviar una propuesta de intercambio")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("Usuario con quien intercambiar")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("offer")
        .setDescription("Lo que ofreces (ej: bronce)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("request")
        .setDescription("Lo que quieres (ej: oro)")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const db = client.db;

    const from = interaction.user;
    const to = interaction.options.getUser("user");

    const offer = interaction.options.getString("offer");
    const request = interaction.options.getString("request");

    if (to.bot) {
      return interaction.reply({ content: "❌ No puedes tradear con bots.", ephemeral: true });
    }

    const tradeId = `${from.id}_${to.id}_${Date.now()}`;

    await db.set(`trade_${to.id}`, {
      from: from.id,
      to: to.id,
      offer,
      request
    });

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("🤝 Nueva oferta de trade")
      .setDescription(`${from.username} quiere intercambiar contigo`)
      .addFields(
        { name: "📤 Ofrece", value: offer, inline: true },
        { name: "📥 Pide", value: request, inline: true }
      )
      .setFooter({ text: "Usa /tradeaccept o /tradedecline" });

    return interaction.reply({
      content: `📨 Trade enviado a ${to.username}`,
      ephemeral: true
    });

    try {
      await to.send({ embeds: [embed] });
    } catch {}
  }
};