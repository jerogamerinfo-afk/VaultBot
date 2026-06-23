const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const ITEMS = {
  vaultop: { name: "VaultOP", price: 1500 },
  bronce: { name: "Caja Bronce", price: 250 },
  plata: { name: "Caja Plata", price: 500 },
  oro: { name: "Caja Oro", price: 1000 },
  luckyspin: { name: "Lucky Spin", price: 400 },
  boostwork: { name: "Boost Work", price: 750 },
  boostdaily: { name: "Boost Daily", price: 750 },
  elite: { name: "Título Elite (VAULTELITE)", price: 2000 },
  adminbox: { name: "Caja ADMIN", price: 5000 }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("🛒 Tienda oficial de VaultBot")
    .addStringOption(option =>
      option.setName("item")
        .setDescription("Producto a comprar")
        .setRequired(true)
        .addChoices(
          { name: "💎 VaultOP", value: "vaultop" },
          { name: "📦 Caja Bronce", value: "bronce" },
          { name: "📦 Caja Plata", value: "plata" },
          { name: "📦 Caja Oro", value: "oro" },
          { name: "🎡 Lucky Spin", value: "luckyspin" },
          { name: "💼 Boost Work", value: "boostwork" },
          { name: "📅 Boost Daily", value: "boostdaily" },
          { name: "👑 Elite", value: "elite" },
          { name: "🛡️ Caja ADMIN", value: "adminbox" }
        )
    ),

  async execute(interaction, client) {
    const db = client.db;
    const user = interaction.user;
    const item = interaction.options.getString("item");

    const selected = ITEMS[item];

    if (!selected) {
      return interaction.reply({ content: "❌ Producto inválido.", ephemeral: true });
    }

    let balance = Number(await db.get(`coins_${user.id}`) || 0);

    if (balance < selected.price) {
      return interaction.reply({
        content: `❌ Necesitas ${selected.price} VaultCoins.`,
        ephemeral: true
      });
    }

    // 🧠 ADMIN CHECK
    if (item === "adminbox") {
      const member = interaction.member;

      const allowed =
        member.roles.cache.has(process.env.OWNER_ROLE_ID) ||
        member.roles.cache.has(process.env.ADMIN_ROLE_ID) ||
        member.roles.cache.has(process.env.MOD_ROLE_ID);

      if (!allowed) {
        return interaction.reply({
          content: "❌ No tienes permisos para comprar esto.",
          ephemeral: true
        });
      }
    }

    await db.set(`coins_${user.id}`, balance - selected.price);

    // 🎁 EXECUTE ITEM
    switch (item) {
      case "vaultop":
        await db.set(`vaultop_${user.id}`, true);
        break;

      case "bronce":
      case "plata":
      case "oro":
        await db.set(`${item}_${user.id}`, true);
        break;

      case "luckyspin":
        await db.set(`spin_${user.id}`, (await db.get(`spin_${user.id}`) || 0) + 1);
        break;

      case "boostwork":
      case "boostdaily":
        await db.set(`${item}_${user.id}`, true);
        break;

      case "elite":
        await db.set(`elite_${user.id}`, true);
        await db.set(`vaultop_${user.id}`, true);
        break;

      case "adminbox":
        await db.set(`cajaadmin_${user.id}`, true);
        break;
    }

    // 🏪 SHOP UI (SOLO ESTO SE RESPONDE)
    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🏪 VaultShop")
      .setDescription("Haz click para comprar 👇");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("buy_vaultop").setLabel("VaultOP").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("buy_bronce").setLabel("Bronce").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("buy_plata").setLabel("Plata").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("buy_oro").setLabel("Oro").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("buy_elite").setLabel("Elite").setStyle(ButtonStyle.Danger)
    );

    return interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
};