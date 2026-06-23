const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("💰 Ver tu balance y estado económico"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    const coins = Number(await db.get(`coins_${user.id}`) || 0);

    const vaultop = await db.get(`vaultop_${user.id}`) || false;
    const elite = await db.get(`elite_${user.id}`) || false;

    const boostwork = await db.get(`boostwork_${user.id}`) || false;
    const boostdaily = await db.get(`boostdaily_${user.id}`) || false;

    const spin = await db.get(`spin_${user.id}`) || 0;

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(`💰 Balance de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "💵 Coins", value: `${coins}`, inline: true },
        { name: "🎡 Spins", value: `${spin}`, inline: true },
        { name: "💎 VIP", value: vaultop ? "VaultOP ✅" : "No", inline: true },
        { name: "👑 Elite", value: elite ? "Sí 👑" : "No", inline: true },
        { name: "💼 Boosts", value: `Work: ${boostwork ? "⚡" : "❌"}\nDaily: ${boostdaily ? "⚡" : "❌"}` }
      )
      .setFooter({ text: "VaultBot Economy System" });

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};