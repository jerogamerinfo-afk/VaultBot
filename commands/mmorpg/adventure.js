const { SlashCommandBuilder } = require("discord.js");
const { getPlayer } = require("../../systems/player");
const { fight } = require("../../systems/combat");
const { getLoot } = require("../../systems/loot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adventure")
    .setDescription("🌍 Explorar el mundo MMORPG"),

  async execute(interaction, client) {

    const db = client.db;
    const user = interaction.user;

    let p = await getPlayer(db, user.id);

    const enemy = {
      name: "Goblin",
      hp: 80,
      attack: 15,
      defense: 5
    };

    const result = fight(
      { name: user.username, ...p },
      enemy
    );

    let loot = getLoot();

    if (result.winner === user.username) {

      p.gold += loot.amount;
      p.wins++;

      await db.set(`mmo_${user.id}`, p);
    }

    return interaction.reply(
      `🌍 **AVENTURA MMORPG**\n\n` +
      result.log.join("\n") +
      `\n\n🏆 Ganador: ${result.winner}\n` +
      `🎁 Loot: ${loot.item} +${loot.amount}`
    );
  }
};