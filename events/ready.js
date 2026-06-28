module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    console.log(`🤖 VaultBot listo como ${client.user.tag}`);
  }
};