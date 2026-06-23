module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const db = client.db;
    const user = interaction.user;

    const trade = await db.get(`trade_${user.id}`);
    if (!trade) return;

    // 🔐 seguridad: solo dueño del trade
    if (
      !interaction.customId.endsWith(user.id)
    ) return;

    // ❌ CANCELAR
    if (interaction.customId.startsWith("trade_cancel")) {
      await db.delete(`trade_${user.id}`);

      return interaction.update({
        content: "❌ Trade cancelado.",
        embeds: [],
        components: []
      });
    }

    // ✅ ACEPTAR
    if (interaction.customId.startsWith("trade_accept")) {

      // 🧠 inventarios
      let invFrom = await db.get(`inv_${trade.from}`) || [];
      let invTo = await db.get(`inv_${trade.to}`) || [];

      // 🧠 ANTI SCAM: verificar items reales
      if (!invFrom.includes(trade.offer)) {
        await db.delete(`trade_${user.id}`);
        return interaction.update({
          content: "❌ El otro jugador ya no tiene el item.",
          components: [],
          embeds: []
        });
      }

      if (!invTo.includes(trade.request)) {
        await db.delete(`trade_${user.id}`);
        return interaction.update({
          content: "❌ Tú ya no tienes el item requerido.",
          components: [],
          embeds: []
        });
      }

      // 🔁 swap real
      invFrom = invFrom.filter(i => i !== trade.offer);
      invTo = invTo.filter(i => i !== trade.request);

      invFrom.push(trade.request);
      invTo.push(trade.offer);

      await db.set(`inv_${trade.from}`, invFrom);
      await db.set(`inv_${trade.to}`, invTo);

      await db.delete(`trade_${user.id}`);

      const done = new EmbedBuilder()
        .setColor("Green")
        .setTitle("💚 Trade completado")
        .setDescription("Intercambio exitoso y verificado en tiempo real");

      return interaction.update({
        embeds: [done],
        components: []
      });
    }
  }
};