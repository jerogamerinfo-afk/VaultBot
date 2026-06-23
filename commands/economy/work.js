const {
  SlashCommandBuilder
} = require("discord.js");

const jobs = [
  "Programador",
  "Streamer",
  "Minero",
  "Ingeniero",
  "Moderador",
  "Diseñador",
  "Desarrollador de VaultBot"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("💼 Trabaja para ganar VaultCoins"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const lastWork =
      await db.get(`work_${user.id}`) || 0;

    const now = Date.now();

    const cooldown = 60 * 60 * 1000; // 1 hora

    if (now - lastWork < cooldown) {

      const remaining =
        Math.ceil(
          (cooldown - (now - lastWork))
          / 60000
        );

      return interaction.reply({
        content:
          `⏳ Debes esperar ${remaining} minutos.`,
        ephemeral: true
      });
    }

    let pay =
      Math.floor(Math.random() * 300) + 100;

    const hasBoost =
      await db.get(`boostwork_${user.id}`);

    let boostText = "";

    if (hasBoost) {

      pay = Math.floor(pay * 1.5);

      boostText =
        "\n🚀 Boost Work consumido (+50%)";

      await db.delete(
        `boostwork_${user.id}`
      );
    }

    let coins =
      Number(
        await db.get(`coins_${user.id}`)
      ) || 0;

    coins += pay;

    await db.set(
      `coins_${user.id}`,
      coins
    );

    await db.set(
      `work_${user.id}`,
      now
    );

    const job =
      jobs[
        Math.floor(
          Math.random() * jobs.length
        )
      ];

    return interaction.reply(
      `💼 Trabajaste como **${job}**\n💰 Ganaste **${pay} VaultCoins**${boostText}`
    );
  }
};