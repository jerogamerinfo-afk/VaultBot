const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gift")
    .setDescription("🎁 Regala VaultCoins a otro usuario")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Usuario")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Cantidad")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;

    const user = interaction.user;
    const target = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (target.bot) {
      return interaction.reply("❌ No puedes regalar VaultCoins a bots.");
    }

    if (target.id === user.id) {
      return interaction.reply("❌ No puedes regalarte VaultCoins a ti mismo.");
    }

    if (!amount || amount <= 0) {
      return interaction.reply("❌ Debes ingresar una cantidad válida.");
    }

    let senderCoins = db.get(`coins_${user.id}`);
    let targetCoins = db.get(`coins_${target.id}`);

    senderCoins = Number(senderCoins || 0);
    targetCoins = Number(targetCoins || 0);

    if (isNaN(senderCoins)) senderCoins = 0;
    if (isNaN(targetCoins)) targetCoins = 0;

    if (senderCoins < amount) {
      return interaction.reply(
        `❌ No tienes suficientes VaultCoins.\n💰 Balance actual: ${senderCoins}`
      );
    }

    const newSender = senderCoins - amount;
    const newTarget = targetCoins + amount;

    if (isNaN(newSender) || isNaN(newTarget)) {
      return interaction.reply(
        "❌ Error interno de economía. Contacta al administrador."
      );
    }

    db.set(`coins_${user.id}`, newSender);
    db.set(`coins_${target.id}`, newTarget);

    return interaction.reply(
      `🎁 Has enviado **${amount} VaultCoins** a **${target.tag}**.\n💰 Tu nuevo balance es: **${newSender} VaultCoins**`
    );
  }
};