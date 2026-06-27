const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vprofile")
    .setDescription("📊 Ver tu perfil de VaultBot"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const coins = Number(await db.get(`coins_${user.id}`) || 0);

    const vaultop = await db.get(`vaultop_${user.id}`) || false;
    const elite = await db.get(`elite_${user.id}`) || false;

    const bronce = await db.get(`cajabronce_${user.id}`) || false;
    const plata = await db.get(`cajaplata_${user.id}`) || false;
    const oro = await db.get(`cajaoro_${user.id}`) || false;

    const spin = await db.get(`spin_${user.id}`) || 0;

    // 🧠 nivel simple basado en coins
    const level = Math.floor(coins / 1000);

    let rank = "🟤 Novato";

    if (level > 10) rank = "🟢 Trader";
    if (level > 25) rank = "🔵 Experto";
    if (level > 50) rank = "🟣 Elite Trader";
    if (level > 100) rank = "👑 Leyenda";

    if (elite) rank = "💎 VAULT ELITE";

    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle(`📊 Perfil de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "💰 Dinero", value: `${coins}`, inline: true },
        { name: "📈 Nivel", value: `${level}`, inline: true },
        { name: "🏷️ Rango", value: rank, inline: false },
        {
          name: "📦 Cajas",
          value:
            `Bronce: ${bronce ? "✔" : "❌"}\n` +
            `Plata: ${plata ? "✔" : "❌"}\n` +
            `Oro: ${oro ? "✔" : "❌"}`
        },
        { name: "🎡 Spins", value: `${spin}`, inline: true },
        { name: "💎 VIP", value: vaultop ? "Sí" : "No", inline: true }
      )
      .setFooter({ text: "VaultBot RPG System" });

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};