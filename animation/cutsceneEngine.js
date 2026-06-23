const { EmbedBuilder } = require("discord.js");

async function playDynamicCutscene(channel, scenes) {

  for (const scene of scenes) {

    const embed = new EmbedBuilder()
      .setTitle(scene.title)
      .setDescription(scene.dialogue)
      .setImage(scene.frame)
      .setColor(scene.color || "DarkBlue");

    await channel.send({ embeds: [embed] });

    if (scene.shake) {
      await channel.send("💥 *screen shake effect*");
    }

    await new Promise(r => setTimeout(r, scene.duration));
  }
}

module.exports = { playDynamicCutscene };