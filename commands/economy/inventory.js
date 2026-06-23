const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("🎒 Ver todas tus cartas y items"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const album =
      await db.get(`album_${user.id}`) || [];

    const items = [
      "vaultop",
      "bronce",
      "plata",
      "oro",
      "adminbox",
      "elite",
      "boostwork",
      "boostdaily"
    ];

    const ownedItems = [];

    for (const item of items) {
      const has = await db.get(`${item}_${user.id}`);
      if (has) ownedItems.push(item);
    }

    const embed =
      new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`🎒 Inventario de ${user.username}`)
        .addFields(
          {
            name: "🎴 Cartas",
            value: album.length
              ? album.join(", ")
              : "Ninguna",
            inline: false
          },
          {
            name: "📦 Items",
            value: ownedItems.length
              ? ownedItems.join(", ")
              : "Ninguno",
            inline: false
          }
        );

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};