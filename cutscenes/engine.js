const { EmbedBuilder } = require("discord.js");

async function playCutscene(channel, scenes) {

  for (const scene of scenes) {

    const embed = new EmbedBuilder()
      .setTitle(scene.title)
      .setDescription(scene.text)
      .setColor(scene.color || "DarkPurple");

    await channel.send({ embeds: [embed] });

    await new Promise(r => setTimeout(r, scene.delay || 2000));
  }
}

module.exports = { playCutscene };