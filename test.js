require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
  console.log("✅ Conectado:", client.user.tag);
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN).catch(console.error);