const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "tradeButtons",

  async execute(interaction, client) {
    try {
      if (!interaction.isButton()) return;

      const db = client.db;
      const user = interaction.user;

      const trade = await db.get(`trade_${user.id}`);
      if (!trade) {
        return interaction.reply({
          content: "❌ No tienes ningún trade activo.",
          ephemeral: true
        });
      }

      // 🔐 seguridad: solo el dueño del trade
      if (!interaction.customId.endsWith(user.id)) {
        return interaction.reply({
          content: "❌ No tienes permiso para esto.",
          ephemeral: true
        });
      }

      // ❌ CANCELAR TRADE
      if (interaction.customId.startsWith("trade_cancel")) {
        await db.delete(`trade_${user.id}`);

        return interaction.update({
          content: "❌ Trade cancelado.",
          embeds: [],
          components: []
        });
      }

      // ✅ ACEPTAR TRADE
      if (interaction.customId.startsWith("trade_accept")) {

        let invFrom = await db.get(`inv_${trade.from}`) || [];
        let invTo = await db.get(`inv_${trade.to}`) || [];

        // 🔍 validaciones anti error
        if (!invFrom.includes(trade.offer)) {
          await db.delete(`trade_${user.id}`);
          return interaction.update({
            content: "❌ El otro jugador ya no tiene el item.",
            embeds: [],
            components: []
          });
        }

        if (!invTo.includes(trade.request)) {
          await db.delete(`trade_${user.id}`);
          return interaction.update({
            content: "❌ Tú ya no tienes el item requerido.",
            embeds: [],
            components: []
          });
        }

        // 🔁 intercambio
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

    } catch (error) {
      console.error("❌ Error en tradeButtons:", error);

      try {
        if (!interaction.replied) {
          await interaction.reply({
            content: "❌ Error procesando el trade.",
            ephemeral: true
          });
        }
      } catch {}
    }
  }
};