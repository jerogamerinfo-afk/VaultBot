const { SlashCommandBuilder } = require("discord.js");
const { TREE } = require("../../systems/skills/tree");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skills")
    .setDescription("🧬 Ver árbol de habilidades"),

  async execute(interaction) {

    let text = "🧬 **ÁRBOL DE HABILIDADES**\n\n";

    for (const tree in TREE) {
      text += `${TREE[tree].name}\n`;
      text += TREE[tree].skills.map(s => `- ${s}`).join("\n");
      text += "\n\n";
    }

    return interaction.reply(text);
  }
};