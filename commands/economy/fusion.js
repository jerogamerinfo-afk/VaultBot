const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fusion")
    .setDescription("🔥 Fusionar 2 cartas")
    .addStringOption(o =>
      o.setName("card1").setRequired(true)
    )
    .addStringOption(o =>
      o.setName("card2").setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const c1 = interaction.options.getString("card1");
    const c2 = interaction.options.getString("card2");

    let album =
      await db.get(`album_${user.id}`) || [];

    if (!album.includes(c1) || !album.includes(c2)) {
      return interaction.reply("❌ No tienes esas cartas.");
    }

    const result = `${c1} X ${c2} GOD`;

    album.push(result);

    await db.set(`album_${user.id}`, album);

    return interaction.reply(`🔥 Fusionaste → **${result}**`);
  }
};