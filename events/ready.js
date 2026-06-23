module.exports = {
  name: "clientReady",
  once: true,
  execute(client) {
    console.log(`🤖 VaultBot listo como ${client.user.tag}`);
  }
};