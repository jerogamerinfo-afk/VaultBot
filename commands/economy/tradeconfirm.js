const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tradeconfirm")
    .setDescription("🔁 Confirmar trade final"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const trade = await db.get(`trade_${user.id}`);

    if (!trade || trade.status !== "accepted") {
      return interaction.reply({
        content: "❌ No hay trade listo.",
        ephemeral: true
      });
    }

    const senderInv = await db.get(`album_${trade.from}`) || [];
    const targetInv = await db.get(`album_${trade.to}`) || [];

    // 🔥 doble verificación anti scam
    if (!senderInv.includes(trade.offer) || !targetInv.includes(trade.request)) {
      await db.delete(`trade_${user.id}`);
      return interaction.reply({ content: "💣 Cambios detectados.", ephemeral: true });
    }

    // 💱 intercambio
    senderInv.splice(senderInv.indexOf(trade.offer), 1);
    targetInv.splice(targetInv.indexOf(trade.request), 1);

    senderInv.push(trade.request);
    targetInv.push(trade.offer);

    await db.set(`album_${trade.from}`, senderInv);
    await db.set(`album_${trade.to}`, targetInv);

    // 🧾 historial
    const historyA = await db.get(`history_${trade.from}`) || [];
    const historyB = await db.get(`history_${trade.to}`) || [];

    historyA.push({ with: trade.to, gave: trade.offer, got: trade.request, date: Date.now() });
    historyB.push({ with: trade.from, gave: trade.request, got: trade.offer, date: Date.now() });

    await db.set(`history_${trade.from}`, historyA);
    await db.set(`history_${trade.to}`, historyB);

    await db.delete(`trade_${user.id}`);

    return interaction.reply({
      content: "✨ Trade completado!"
    });
  }
};