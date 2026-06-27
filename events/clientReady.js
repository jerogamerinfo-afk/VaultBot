const economyTick = require("./economyTick");

module.exports = {
  name: "clientReady",
  once: true,

  execute(client) {

    console.log(`🤖 VaultBot listo como ${client.user.tag}`);

    economyTick(client);

  }
};