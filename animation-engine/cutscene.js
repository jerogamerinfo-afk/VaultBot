const { EmbedBuilder } = require("discord.js");

async function cinematic(channel, scenes) {

  for (const s of scenes) {

    const embed = new EmbedBuilder()
      .setTitle(s.title)
      .setDescription(s.text)
      .setColor(s.color || "DarkRed");

    await channel.send({ embeds: [embed] });

    await new Promise(r => setTimeout(r, s.delay));
  }
}

module.exports = { cinematic };