const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("🎲 Gira la moneda y gana VaultCoins"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const result = Math.random() < 0.5 ? "cara" : "cruz";

    const isVaultOP = await db.get(`vaultop_${user.id}`);

    let reward = 0;

    if (isVaultOP) {
      reward = result === "cara" ? 3 : 5;
    } else {
      reward = result === "cara" ? 0.5 : 1;
    }

    const current = await db.get(`coins_${user.id}`) || 0;
    await db.set(`coins_${user.id}`, current + reward);

    return interaction.reply(
      `🎲 Salió **${result}**\n💰 Ganaste **${reward} VaultCoins**`
    );
  }
};