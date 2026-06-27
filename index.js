require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("croxydb");

console.log("🚀 Iniciando VaultBot PRO...");

// ==========================
// EXPRESS (Render)
// ==========================
const app = express();

app.get("/", (req, res) => {
  res.send("VaultBot PRO está funcionando.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Keep-alive server running on port ${PORT}`);
});

// ==========================
// CLIENTE
// ==========================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.db = db;
client.commands = new Collection();

// ==========================
// CARGAR COMANDOS
// ==========================
const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    for (const file of files) {
      const command = require(path.join(folderPath, file));

      if (command?.data?.name && command?.execute) {
        client.commands.set(command.data.name, command);
        console.log(`📦 Comando cargado: ${command.data.name}`);
      }
    }
  }
}

// ==========================
// CARGAR EVENTOS
// ==========================
const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (!event?.name) continue;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`🎧 Evento cargado: ${event.name}`);
  }
}

// ==========================
// INTERACCIONES
// ==========================
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return interaction.reply({
      content: "❌ Comando no encontrado.",
      ephemeral: true
    });
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error("❌ Error ejecutando comando:", error);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "❌ Ocurrió un error ejecutando el comando.",
        ephemeral: true
      });
    } else {
      await interaction.followUp({
        content: "❌ Ocurrió un error ejecutando el comando.",
        ephemeral: true
      });
    }
  }
});

// ==========================
// DEBUG
// ==========================
console.log("Node:", process.version);
console.log("Discord.js:", require("discord.js").version);
console.log("Token encontrado:", !!process.env.DISCORD_TOKEN);

client.on("debug", info => {
  console.log("[DEBUG]", info);
});

client.on("warn", warning => {
  console.warn("[WARN]", warning);
});

client.on("error", error => {
  console.error("[CLIENT ERROR]", error);
});

process.on("unhandledRejection", error => {
  console.error("⚠️ Unhandled Rejection:", error);
});

process.on("uncaughtException", error => {
  console.error("⚠️ Uncaught Exception:", error);
});

// ==========================
// READY
// ==========================
client.once("clientReady", readyClient => {
  console.log(`🤖 VaultBot listo como ${readyClient.user.tag}`);
});

// ==========================
// LOGIN
// ==========================
(async () => {
  try {
    console.log("🚀 Intentando iniciar sesión...");
    await client.login(process.env.DISCORD_TOKEN);
    console.log("✅ Login completado.");
  } catch (error) {
    console.error("❌ Error durante login:", error);
  }
})();