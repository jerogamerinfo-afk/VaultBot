require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const db = require("croxydb");
const express = require("express");

console.log("🚀 Iniciando VaultBot PRO...");

// =====================
// KEEP ALIVE (Render)
// =====================
const app = express();

app.get("/", (req, res) => {
  res.send("VaultBot PRO is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Keep-alive server running on port ${PORT}`);
});

// =====================
// CLIENTE DISCORD
// =====================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// 💾 DATABASE
client.db = db;

// 📦 COMANDOS
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const command = require(filePath);

      if (command?.data?.name && command?.execute) {
        client.commands.set(command.data.name, command);
        console.log(`📦 Comando cargado: ${command.data.name}`);
      }
    }
  }
}

// 🎧 EVENTOS
const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (!event?.name) continue;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`🎧 Evento cargado: ${event.name}`);
  }
}

// ⚡ INTERACTIONS (slash commands)
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
  } catch (err) {
    console.error("❌ Error en comando:", err);

    if (!interaction.replied) {
      interaction.reply({
        content: "❌ Ocurrió un error ejecutando el comando.",
        ephemeral: true
      });
    }
  }
});

// 🧠 ANTI CRASH SYSTEM
process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err);
});

// 🟢 READY EVENT (FIXED)
client.once("clientReady", () => {
  console.log(`✅ VaultBot online como ${client.user.tag}`);
});

// 🔐 LOGIN
client.login(process.env.DISCORD_TOKEN);