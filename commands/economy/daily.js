const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("🎁 Reclama tu recompensa diaria"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const lastDaily =
      await db.get(`daily_${user.id}`) || 0;

    const now = Date.now();

    const cooldown =
      24 * 60 * 60 * 1000;

    if (now - lastDaily < cooldown) {

      const hours =
        Math.ceil(
          (cooldown - (now - lastDaily))
          / 3600000
        );

      return interaction.reply({
        content:
          `⏳ Debes esperar ${hours} horas.`,
        ephemeral: true
      });
    }

    let reward =
      Math.floor(Math.random() * 500) + 200;

    const hasBoost =
      await db.get(`boostdaily_${user.id}`);

    let boostText = "";

    if (hasBoost) {

      reward *= 2;

      boostText =
        "\n🚀 Boost Daily consumido (x2)";

      await db.delete(
        `boostdaily_${user.id}`
      );
    }

    let coins =
      Number(
        await db.get(`coins_${user.id}`)
      ) || 0;

    coins += reward;

    await db.set(
      `coins_${user.id}`,
      coins
    );

    await db.set(
      `daily_${user.id}`,
      now
    );

    return interaction.reply(
      `🎁 Daily reclamado\n💰 Recibiste **${reward} VaultCoins**${boostText}`
    );
  }
};