const { SlashCommandBuilder } = require("discord.js");

const CARDS = [
  { name: "Chatsito", rarity: "SECRET LEGEND", weight: 1, secret: true },
  { name: "MrBeast", rarity: "legendaria", weight: 2 },
  { name: "Jero Gamer", rarity: "épica", weight: 5 },
  { name: "Rubius", rarity: "épica", weight: 5 },
  { name: "AuronPlay", rarity: "épica", weight: 6 },
  { name: "Fernanfloo", rarity: "rara", weight: 12 },
  { name: "Mikecrack", rarity: "rara", weight: 12 },
  { name: "Ibai", rarity: "común", weight: 30 },
  { name: "Diki Duki Dariel", rarity: "común", weight: 35 }
];

function rollCard() {
  const pool = [];

  for (const c of CARDS) {
    for (let i = 0; i < c.weight; i++) {
      pool.push(c);
    }
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("openpack")
    .setDescription("🎁 Abre una loot box"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let coins = Number(await db.get(`coins_${user.id}`) || 0);

    if (coins < 200) {
      return interaction.reply("❌ Necesitas 200 coins.");
    }

    await db.set(`coins_${user.id}`, coins - 200);

    let album = await db.get(`album_${user.id}`);
    if (!Array.isArray(album)) album = [];

    // 🎬 LOOT BOX ANIMACIÓN
    let msg = await interaction.reply({
      content: "🎁 Abriendo pack...",
      fetchReply: true
    });

    const stages = [
      "🎁 Abriendo pack...",
      "✨ Mezclando cartas...",
      "🎲 Decidiendo suerte...",
      "📦 Revelando carta..."
    ];

    for (const text of stages) {
      await new Promise(r => setTimeout(r, 900));
      await msg.edit(text);
    }

    const results = [];

    for (let i = 0; i < 3; i++) {

      const card = rollCard();

      const shiny = Math.random() < 0.03;
      const secret = card.secret && Math.random() < 0.2;

      let finalName = card.name;
      let rarity = card.rarity;

      if (secret) {
        finalName = `🧬 SECRET ${card.name}`;
        rarity = "💀 ULTRA SECRET";
      }

      if (shiny) {
        finalName = `✨ SHINY ${finalName}`;
      }

      album.push(finalName);

      results.push(`🃏 ${finalName} (${rarity})`);
    }

    await db.set(`album_${user.id}`, album);

    await msg.edit(
      `🎁 PACK ABIERTO\n\n` +
      results.join("\n") +
      `\n\n📘 Cartas en tu colección: ${album.length}`
    );
  }
};