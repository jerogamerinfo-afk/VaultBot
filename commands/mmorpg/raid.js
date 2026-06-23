const { SlashCommandBuilder } = require("discord.js");
const { joinQueue } = require("../../systems/raids/matchmaking");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("raid")
    .setDescription("🏰 Unirse a raid automática"),

  async execute(interaction) {

    const result = joinQueue({
      id: interaction.user.id,
      name: interaction.user.username
    });

    if (!result) {
      return interaction.reply("⏳ Buscando jugadores para raid...");
    }

    return interaction.reply(
      `🏰 RAID INICIADA!\n🐉 Boss: ${result.boss}\n👥 Jugadores: ${result.players.length}`
    );
  }
};