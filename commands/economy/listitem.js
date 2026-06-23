const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listitem")
    .setDescription("🏪 Publicar item en marketplace")
    .addStringOption(o =>
      o.setName("item").setRequired(true)
    )
    .addIntegerOption(o =>
      o.setName("price").setRequired(true)
    ),

  async execute(interaction, client) {
    const db = client.db;

    const user = interaction.user;
    const item = interaction.options.getString("item");
    const price = interaction.options.getInteger("price");

    const listings = await db.get("market") || [];

    listings.push({
      id: Date.now(),
      seller: user.id,
      item,
      price
    });

    await db.set("market", listings);

    return interaction.reply({
      content: `🏪 Publicaste **${item}** por ${price}`,
      ephemeral: true
    });
  }
};