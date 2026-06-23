const {
  SlashCommandBuilder
} = require("discord.js");

const {
  evolveCard
} = require("../../utils/evolution");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usecard")
    .setDescription("🎴 Usar carta")
    .addStringOption(o =>
      o.setName("card")
        .setDescription("Carta")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const card =
      interaction.options.getString("card");

    let album =
      await db.get(`album_${user.id}`) || [];

    if (!album.includes(card)) {
      return interaction.reply("❌ No tienes esa carta.");
    }

    let uses =
      await db.get(`uses_${user.id}_${card}`) || 0;

    uses++;

    await db.set(
      `uses_${user.id}_${card}`,
      uses
    );

    let msg = `📊 Usos: ${uses}`;

    if (uses >= 25) {

      const evo = evolveCard(card);

      if (evo !== card) {

        const index = album.indexOf(card);
        album[index] = evo;

        await db.set(`album_${user.id}`, album);

        msg += `\n🧬 Evolucionó a **${evo}**`;
      }
    }

    return interaction.reply({
      content: `🎴 ${card}\n${msg}`
    });
  }
};