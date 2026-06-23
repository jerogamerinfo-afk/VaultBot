const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("💳 Pagar a otro usuario")
    .addUserOption(o =>
      o.setName("user").setRequired(true)
    )
    .addIntegerOption(o =>
      o.setName("amount").setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;

    const user = interaction.user;
    const target = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    let sender = Number(await db.get(`coins_${user.id}`)) || 0;
    let receiver = Number(await db.get(`coins_${target.id}`)) || 0;

    if (sender < amount)
      return interaction.reply("❌ No tienes VaultCoins.");

    sender -= amount;
    receiver += amount;

    await db.set(`coins_${user.id}`, sender);
    await db.set(`coins_${target.id}`, receiver);

    return interaction.reply(`💳 Enviaste ${amount} a ${target.username}`);
  }
};