const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcoins")
    .setDescription("💰 Añadir VaultCoins a un usuario")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Usuario")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("vaultcoins")
        .setDescription("Cantidad")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    if (interaction.user.id !== process.env.OWNER_ID) {
      return interaction.reply({
        content: "❌ Solo el desarrollador puede usar este comando.",
        ephemeral: true
      });
    }

    const db = client.db;

    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("vaultcoins");

    if (amount <= 0) {
      return interaction.reply("❌ Cantidad inválida.");
    }

    const current = Number(db.get(`coins_${user.id}`) || 0);

    db.set(
      `coins_${user.id}`,
      current + amount
    );

    return interaction.reply(
      `✅ Se añadieron ${amount} VaultCoins a ${user.tag}.\n💰 Nuevo balance: ${current + amount}`
    );
  }
};