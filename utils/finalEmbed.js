const { EmbedBuilder } = require("discord.js");

function buildPackEmbed(user, results, album) {

  // contar rarezas
  const secret = results.filter(r => r.includes("SECRET")).length;
  const shiny = results.filter(r => r.includes("SHINY")).length;

  let color = "Gold";

  if (secret > 0) color = "Purple";
  if (shiny > 0 && secret === 0) color = "Aqua";

  return new EmbedBuilder()
    .setTitle("🎁 LOOT BOX ABIERTO - VAULT COLLECTION")
    .setColor(color)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))

    .setDescription(
      results.length
        ? results.map(r => `🃏 ${r}`).join("\n")
        : "No obtuviste cartas."
    )

    .addFields(
      {
        name: "📘 Colección total",
        value: `${album.length} cartas`,
        inline: true
      },
      {
        name: "✨ Shiny obtenidas",
        value: `${shiny}`,
        inline: true
      },
      {
        name: "🧬 Secretas",
        value: `${secret}`,
        inline: true
      }
    )

    .setFooter({
      text: `Jugador: ${user.tag} • Vault Collection System`
    })

    .setTimestamp();
}

module.exports = { buildPackEmbed };