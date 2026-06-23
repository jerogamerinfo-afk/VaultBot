const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("💸 Paga una deuda a otro usuario")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Usuario al que le debes")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Cantidad a pagar")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;

    const user = interaction.user;
    const target = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (amount <= 0) {
      return interaction.reply("❌ Cantidad inválida.");
    }

    let balance = Number(await db.get(`coins_${user.id}`) || 0);

    if (isNaN(balance)) balance = 0;

    if (balance < amount) {
      return interaction.reply(
        `❌ No tienes suficientes VaultCoins.\n💰 Balance actual: ${balance}`
      );
    }

    const debtKey = `debt_${user.id}_${target.id}`;

    let debt = Number(await db.get(debtKey) || 0);

    if (isNaN(debt)) debt = 0;

    if (debt <= 0) {
      return interaction.reply(
        "❌ No tienes ninguna deuda con este usuario."
      );
    }

    const payAmount = Math.min(amount, debt);

    let targetCoins = Number(await db.get(`coins_${target.id}`) || 0);

    if (isNaN(targetCoins)) targetCoins = 0;

    const newBalance = balance - payAmount;
    const newTargetCoins = targetCoins + payAmount;
    const newDebt = debt - payAmount;

    if (
      isNaN(newBalance) ||
      isNaN(newTargetCoins) ||
      isNaN(newDebt)
    ) {
      return interaction.reply(
        "❌ Error interno de economía."
      );
    }

    await db.set(`coins_${user.id}`, newBalance);
    await db.set(`coins_${target.id}`, newTargetCoins);
    await db.set(debtKey, newDebt);

    return interaction.reply(
      `💸 Pagaste ${payAmount} VaultCoins a ${target.username}\n📉 Deuda restante: ${newDebt} VaultCoins`
    );
  }
};