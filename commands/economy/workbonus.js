const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("workbonus")
    .setDescription("🛠️ Trabaja con bonus (24h cooldown)"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    const cooldown = 24 * 60 * 60 * 1000; // 24h
    const last = db.get(`workbonus_${user.id}`) || 0;

    if (Date.now() - last < cooldown) {

      const timeLeft = cooldown - (Date.now() - last);

      const hours = Math.floor(timeLeft / 3600000);
      const minutes = Math.floor((timeLeft % 3600000) / 60000);

      return interaction.reply(
        `⏳ Ya trabajaste hoy\nEspera ${hours}h ${minutes}m`
      );
    }

    // 🕒 guardar uso
    db.set(`workbonus_${user.id}`, Date.now());

    const jobs = ["programador", "minero", "piloto", "chef"];
    const job = jobs[Math.floor(Math.random() * jobs.length)];

    const base = Math.floor(Math.random() * 200) + 50;
    const bonus = Math.random() < 0.2 ? 100 : 0;

    const total = base + bonus;

    const current = db.get(`coins_${user.id}`) || 0;
    db.set(`coins_${user.id}`, current + total);

    return interaction.reply(
      `🛠️ Trabajaste como **${job}**\n💰 Ganaste ${total} coins`
    );
  }
};