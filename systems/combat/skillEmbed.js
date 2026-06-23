const { EmbedBuilder } = require("discord.js");

function skillAnimation(user, skill, damage) {

  return new EmbedBuilder()
    .setTitle(`⚔️ ${user} usa ${skill}`)
    .setColor("Red")
    .setDescription(
      `💥 **Impacto crítico!**\n` +
      `🔥 Daño causado: **${damage}**\n\n` +
      `💫 *Animación: ${skill.toUpperCase()} EXPLODE*`
    )
    .setFooter({ text: "VAULT MMORPG COMBAT SYSTEM" });
}

module.exports = { skillAnimation };