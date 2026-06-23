const { SlashCommandBuilder } = require("discord.js");
const { getRandomMission } = require("../../systems/dailyMission");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("missions")
    .setDescription("🎯 Ver tu misión diaria"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let mission = await db.get(`mission_${user.id}`);

    const now = Date.now();

    // reset cada 24h
    if (!mission || now - mission.time > 86400000) {

      mission = getRandomMission();

      await db.set(`mission_${user.id}`, {
        ...mission,
        progress: 0,
        time: now
      });
    }

    return interaction.reply(
      `🎯 **MISIÓN DIARIA**\n\n` +
      `${mission.text}\n\n` +
      `📊 Progreso: ${mission.progress}/${mission.goal}\n` +
      `🏆 Recompensa: ${mission.reward} coins`
    );
  }
};