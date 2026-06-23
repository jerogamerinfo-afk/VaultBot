const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("debt")
    .setDescription("📄 Crear una deuda entre usuarios")

    .addUserOption(option =>
      option
        .setName("user1")
        .setDescription("Deudor")
        .setRequired(true)
    )

    .addUserOption(option =>
      option
        .setName("user2")
        .setDescription("Acreedor")
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

    const user1 = interaction.options.getUser("user1");
    const user2 = interaction.options.getUser("user2");
    const amount = interaction.options.getInteger("vaultcoins");

    if (amount <= 0) {
      return interaction.reply("❌ Cantidad inválida.");
    }

    if (user1.id === user2.id) {
      return interaction.reply(
        "❌ El deudor y el acreedor no pueden ser la misma persona."
      );
    }

    const debtKey = `debt_${user1.id}_${user2.id}`;

    const currentDebt =
      Number(db.get(debtKey) || 0);

    const newDebt = currentDebt + amount;

    db.set(debtKey, newDebt);

    return interaction.reply(
      `📄 Deuda creada\n\n👤 Deudor: ${user1.tag}\n👤 Acreedor: ${user2.tag}\n💰 Añadido: ${amount} VaultCoins\n📈 Deuda total: ${newDebt} VaultCoins`
    );
  }
};