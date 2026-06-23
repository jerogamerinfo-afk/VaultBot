const { EmbedBuilder } = require("discord.js");

async function playCutscene(channel, scenes) {

  for (const scene of scenes) {

    const embed = new EmbedBuilder()
      .setTitle(scene.title)
      .setDescription(scene.text)
      .setImage(scene.image || null)
      .setColor(scene.color || "DarkPurple");

    await channel.send({ embeds: [embed] });

    // 🎬 “cinematic delay”
    await new Promise(r => setTimeout(r, scene.duration || 2500));
  }
}

module.exports = { playCutscene };