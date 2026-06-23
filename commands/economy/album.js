const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("album")
    .setDescription("📘 Ver tu álbum de figuritas"),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;

    let album = await db.get(`album_${user.id}`);

    if (!Array.isArray(album)) {
      album = [];
    }

    // 📊 Conteo de figuritas
    const counts = {};
    for (const fig of album) {
      counts[fig] = (counts[fig] || 0) + 1;
    }

    const lista = Object.keys(counts).length
      ? Object.entries(counts)
          .map(([name, count]) => `🃏 ${name} x${count}`)
          .join("\n")
      : "❌ Tu álbum está vacío";

    const embed = new EmbedBuilder()
      .setTitle("📘 ÁLBUM DE FIGURITAS")
      .setColor("Gold")
      .setDescription(lista)
      .addFields(
        {
          name: "🎴 Total de figuritas",
          value: `${album.length}`,
          inline: true
        },
        {
          name: "🧠 Colección única",
          value: `${Object.keys(counts).length}`,
          inline: true
        }
      )
      .setFooter({
        text: `Jugador: ${user.tag}`
      });

    return interaction.reply({ embeds: [embed] });
  }
};