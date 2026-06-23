const { SlashCommandBuilder } = require("discord.js");

const FIGURITAS = [
  { name: "Chatsito", rarity: "legendaria" },
  { name: "Jero Gamer", rarity: "legendaria" },
  { name: "MrBeast", rarity: "legendaria" },
  { name: "Rubius", rarity: "épica" },
  { name: "Vegetta777", rarity: "épica" },
  { name: "AuronPlay", rarity: "épica" },
  { name: "Fernanfloo", rarity: "rara" },
  { name: "Mikecrack", rarity: "rara" },
  { name: "TheGrefg", rarity: "rara" },
  { name: "Ibai", rarity: "rara" },
  { name: "Diki Duki Dariel", rarity: "legendaria" }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spin")
    .setDescription("🎡 Obtén figuritas"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let spins = Number(await db.get(`spin_${user.id}`) || 0);

    if (spins <= 0) {
      return interaction.reply("❌ No tienes Lucky Spins.");
    }

    await db.set(`spin_${user.id}`, spins - 1);

    const hasVaultOP = await db.get(`vaultop_${user.id}`);
    const hasElite = await db.get(`elite_${user.id}`);

    let amount = 1;
    if (hasVaultOP) amount = 3;
    if (hasElite) amount = 5;

    let album = await db.get(`album_${user.id}`);
    if (!Array.isArray(album)) album = [];

    const obtenidas = [];

    for (let i = 0; i < amount; i++) {

      const fig =
        FIGURITAS[Math.floor(Math.random() * FIGURITAS.length)];

      album.push(fig.name);
      obtenidas.push(`${fig.name} (${fig.rarity})`);
    }

    await db.set(`album_${user.id}`, album);

    return interaction.reply(
      `🎡 Has obtenido ${amount} figurita(s)\n\n` +
      obtenidas.map(f => `🃏 ${f}`).join("\n") +
      `\n\n🎟️ Spins restantes: ${spins - 1}`
    );
  }
};