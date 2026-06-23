const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const {
  evolveCard
} = require("../../utils/evolution");

const CARDS = [
  {
    name: "Rubius",
    rarity: "Rare",
    chance: 35
  },
  {
    name: "Jero Gamer",
    rarity: "Rare",
    chance: 35
  },
  {
    name: "Ibai",
    rarity: "Epic",
    chance: 20
  },
  {
    name: "MrBeast",
    rarity: "Legendary",
    chance: 9
  },
  {
    name: "VaultBot Creator",
    rarity: "Mythic",
    chance: 1
  }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gacha")
    .setDescription("🎰 Abrir una tirada gacha (200 Coins)"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let coins =
      Number(
        await db.get(`coins_${user.id}`)
      ) || 0;

    if (coins < 200) {
      return interaction.reply({
        content:
          "❌ Necesitas 200 VaultCoins.",
        ephemeral: true
      });
    }

    // 💸 cobrar
    coins -= 200;

    await db.set(
      `coins_${user.id}`,
      coins
    );

    // 🎰 roll
    const roll =
      Math.random() * 100;

    let current = 0;
    let reward = CARDS[0];

    for (const card of CARDS) {

      current += card.chance;

      if (roll <= current) {
        reward = card;
        break;
      }
    }

    // 📦 álbum
    let album =
      await db.get(
        `album_${user.id}`
      ) || [];

    album.push(reward.name);

    await db.set(
      `album_${user.id}`,
      album
    );

    // 📊 copias
    let copies =
      await db.get(
        `copies_${user.id}_${reward.name}`
      ) || 0;

    copies++;

    await db.set(
      `copies_${user.id}_${reward.name}`,
      copies
    );

    let evolvedText = "";

    // 🧬 evolución automática
    if (copies >= 3) {

      const evolved =
        evolveCard(reward.name);

      if (evolved !== reward.name) {

        album.push(evolved);

        await db.set(
          `album_${user.id}`,
          album
        );

        await db.set(
          `copies_${user.id}_${reward.name}`,
          0
        );

        evolvedText =
          `\n\n🧬 EVOLUCIÓN!\n${reward.name} ➜ ${evolved}`;
      }
    }

    const embed =
      new EmbedBuilder()
        .setColor("Gold")
        .setTitle("🎰 GACHA OPEN")
        .setDescription(
          `🎴 Carta obtenida: **${reward.name}**\n🏆 Rareza: **${reward.rarity}**${evolvedText}`
        )
        .addFields({
          name: "💰 Coins restantes",
          value: `${coins}`
        })
        .setFooter({
          text:
            "VaultBot Gacha System"
        })
        .setTimestamp();

    return interaction.reply({
      embeds: [embed]
    });
  }
};