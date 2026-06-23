const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const {
  evolveCard
} = require("../../utils/evolution");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cardinfo")
    .setDescription("📖 Información de una carta")
    .addStringOption(option =>
      option
        .setName("card")
        .setDescription("Nombre de la carta")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const card =
      interaction.options.getString("card");

    const uses =
      await db.get(
        `uses_${user.id}_${card}`
      ) || 0;

    let rarity = "Common";

    if (
      card.includes("PRO")
    ) rarity = "Epic";

    if (
      card.includes("GOD")
    ) rarity = "Legendary";

    if (
      card.includes("PRIME") ||
      card.includes("ULTRA") ||
      card.includes("TITAN")
    ) rarity = "Mythic";

    const next =
      evolveCard(card);

    const embed =
      new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`🎴 ${card}`)
        .addFields(
          {
            name: "🏆 Rareza",
            value: rarity,
            inline: true
          },
          {
            name: "📊 Usos",
            value: `${uses}/25`,
            inline: true
          },
          {
            name: "🧬 Próxima Evolución",
            value:
              next === card
                ? "Máxima evolución"
                : next,
            inline: false
          }
        )
        .setFooter({
          text:
            "VaultBot Card System"
        });

    return interaction.reply({
      embeds: [embed]
    });
  }
};