const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("openlootbox")
    .setDescription("🎁 Abrir una caja")
    .addStringOption(option =>
      option.setName("type")
        .setDescription("Tipo de caja")
        .setRequired(true)
        .addChoices(
          { name: "📦 Bronce", value: "cajabronce" },
          { name: "📦 Plata", value: "cajaplata" },
          { name: "📦 Oro", value: "cajaoro" }
        )
    ),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const type = interaction.options.getString("type");

    const hasBox = await db.get(`${type}_${user.id}`) || false;

    if (!hasBox) {
      return interaction.reply({
        content: "❌ No tienes esa caja.",
        ephemeral: true
      });
    }

    // 🎲 rewards por caja
    const rewards = {
      cajabronce: [
        { coins: 100 },
        { coins: 150 },
        { item: "boostwork" }
      ],
      cajaplata: [
        { coins: 300 },
        { coins: 500 },
        { item: "boostdaily" }
      ],
      cajaoro: [
        { coins: 800 },
        { coins: 1200 },
        { item: "elite" }
      ]
    };

    const pool = rewards[type];
    const reward = pool[Math.floor(Math.random() * pool.length)];

    // 💰 coins actuales
    let coins = Number(await db.get(`coins_${user.id}`) || 0);

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🎁 Caja Abierta")
      .setDescription(`${user.username} abrió una caja **${type}**`)
      .setTimestamp();

    // 🎁 aplicar recompensa
    if (reward.coins) {
      coins += reward.coins;
      await db.set(`coins_${user.id}`, coins);

      embed.addFields({
        name: "💰 Recompensa",
        value: `${reward.coins} VaultCoins`
      });
    }

    if (reward.item) {
      await db.set(`${reward.item}_${user.id}`, true);

      embed.addFields({
        name: "🎁 Item",
        value: reward.item
      });
    }

    // ❌ eliminar caja
    await db.delete(`${type}_${user.id}`);

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};