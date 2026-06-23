const { SlashCommandBuilder } = require("discord.js");

const cards = [
  { name: "Rubius", rarity: "common" },
  { name: "Ibai", rarity: "rare" },
  { name: "MrBeast", rarity: "epic" },
  { name: "Jero GOD", rarity: "legendary" }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gacha")
    .setDescription("🎰 Gacha de cartas"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const card =
      cards[Math.floor(Math.random() * cards.length)];

    let album =
      await db.get(`album_${user.id}`) || [];

    album.push(card.name);

    await db.set(`album_${user.id}`, album);

    return interaction.reply(
      `🎰 Obtuviste **${card.name}** (${card.rarity})`
    );
  }
};