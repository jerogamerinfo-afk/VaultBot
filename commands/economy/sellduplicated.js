const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sellduplicated")
    .setDescription("💰 Vende duplicados")
    .addStringOption(o =>
      o.setName("figurita").setDescription("Nombre").setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const fig = interaction.options.getString("figurita");

    let album = await db.get(`album_${user.id}`) || [];

    const count = album.filter(f => f === fig).length;

    if (count <= 1) {
      return interaction.reply("❌ No tienes duplicados.");
    }

    album.splice(album.indexOf(fig), 1);

    let coins = Number(await db.get(`coins_${user.id}`) || 0);

    const reward = 100;

    await db.set(`coins_${user.id}`, coins + reward);
    await db.set(`album_${user.id}`, album);

    return interaction.reply(`💰 Vendiste 1 ${fig} por ${reward} coins`);
  }
};