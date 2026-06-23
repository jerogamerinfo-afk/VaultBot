const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bank")
    .setDescription("🏦 Banco")
    .addStringOption(o =>
      o.setName("action")
        .setDescription("deposit / withdraw / balance")
        .setRequired(true)
    )
    .addIntegerOption(o =>
      o.setName("amount")
        .setDescription("Cantidad")
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const action = interaction.options.getString("action");
    const amount = interaction.options.getInteger("amount") || 0;

    let wallet = Number(await db.get(`coins_${user.id}`)) || 0;
    let bank = Number(await db.get(`bank_${user.id}`)) || 0;

    if (action === "balance") {
      return interaction.reply(`🏦 Banco: ${bank} | 💰 Wallet: ${wallet}`);
    }

    if (action === "deposit") {

      if (wallet < amount)
        return interaction.reply("❌ No tienes suficiente dinero.");

      wallet -= amount;
      bank += amount;

    }

    if (action === "withdraw") {

      if (bank < amount)
        return interaction.reply("❌ No tienes en el banco.");

      bank -= amount;
      wallet += amount;
    }

    await db.set(`coins_${user.id}`, wallet);
    await db.set(`bank_${user.id}`, bank);

    return interaction.reply(`🏦 Operación completada.`);
  }
};