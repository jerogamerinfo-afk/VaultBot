const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topranking")
    .setDescription("🏆 Ranking de coleccionistas"),

  async execute(interaction, client) {

    const db = client.db;

    const all = db.all ? db.all() : [];

    const users = [];

    for (const key in all) {

      if (!key.startsWith("album_")) continue;

      const id = key.replace("album_", "");
      const album = all[key] || [];

      const unique = new Set(album).size;

      const rarityScore = album.filter(c =>
        c.includes("legendaria") || c.includes("SECRET")
      ).length;

      users.push({
        id,
        score: unique + rarityScore * 2
      });
    }

    users.sort((a, b) => b.score - a.score);

    const top = users.slice(0, 10);

    return interaction.reply(
      "🏆 TOP COLECCIONISTAS\n\n" +
      top.map((u, i) =>
        `#${i + 1} <@${u.id}> - ${u.score} pts`
      ).join("\n")
    );
  }
};