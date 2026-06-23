const { EmbedBuilder } = require("discord.js");

function animateSkill(user, skill, dmg, combo) {

  return new EmbedBuilder()
    .setTitle(`⚔️ ${user} usa ${skill}`)
    .setDescription(
      combo
        ? `🔥 **${combo} ACTIVADO!**\n💥 Daño: ${dmg}`
        : `💥 Daño: ${dmg}`
    )
    .setColor(combo ? "Gold" : "Red");
}

module.exports = { animateSkill };