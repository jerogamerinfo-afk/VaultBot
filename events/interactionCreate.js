const {
  Events
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction, client) {

    const db = client.db;

    // =========================
    // 📌 SLASH COMMANDS
    // =========================
    if (interaction.isChatInputCommand()) {

      const command =
        client.commands.get(
          interaction.commandName
        );

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(err);

        return interaction.reply({
          content:
            "❌ Error ejecutando el comando.",
          ephemeral: true
        });
      }
    }

    // =========================
    // ⭐ SELECT MENU (FAVORITE CARD)
    // =========================
    if (interaction.isStringSelectMenu()) {

      if (interaction.customId === "favorite_card") {

        const card =
          interaction.values[0];

        await db.set(
          `favorite_${interaction.user.id}`,
          card
        );

        return interaction.update({
          content:
            `⭐ Carta favorita establecida: **${card}**`,
          components: []
        });
      }
    }

    // =========================
    // 🏪 CARD MARKET BUTTONS
    // =========================
    if (interaction.isButton()) {

      // ================= BUY CARD =================
      if (
        interaction.customId.startsWith("buycard_")
      ) {

        const id =
          Number(
            interaction.customId.split("_")[1]
          );

        let market =
          await db.get("card_market") || [];

        const item =
          market.find(x => x.id === id);

        if (!item) {
          return interaction.reply({
            content:
              "❌ Este item ya no existe.",
            ephemeral: true
          });
        }

        let coins =
          Number(
            await db.get(
              `coins_${interaction.user.id}`
            )
          ) || 0;

        if (coins < item.price) {
          return interaction.reply({
            content:
              "❌ No tienes suficientes coins.",
            ephemeral: true
          });
        }

        // 💸 pagar
        await db.set(
          `coins_${interaction.user.id}`,
          coins - item.price
        );

        // 📦 agregar carta
        let album =
          await db.get(
            `album_${interaction.user.id}`
          ) || [];

        album.push(item.card);

        await db.set(
          `album_${interaction.user.id}`,
          album
        );

        // ❌ remover del market
        market =
          market.filter(
            x => x.id !== id
          );

        await db.set(
          "card_market",
          market
        );

        return interaction.reply({
          content:
            `✅ Compraste **${item.card}** por ${item.price} coins.`
        });
      }

      // ================= INFO CARD =================
      if (
        interaction.customId.startsWith("info_")
      ) {

        const id =
          Number(
            interaction.customId.split("_")[1]
          );

        const market =
          await db.get("card_market") || [];

        const item =
          market.find(x => x.id === id);

        if (!item) {
          return interaction.reply({
            content:
              "❌ No existe info.",
            ephemeral: true
          });
        }

        return interaction.reply({
          content:
            `📖 Carta: **${item.card}**\n💰 Precio: ${item.price}\n👤 Vendedor: <@${item.seller}>`,
          ephemeral: true
        });
      }
    }
  }
};