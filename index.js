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
const https = require("https");
console.log("🚀 Iniciando VaultBot PRO (TEST CRÍTICO)...");

// ==========================
// EXPRESS (Render keep-alive)
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
// CLIENTE DISCORD
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
// DEBUG DISCORD (CRÍTICO)
// ==========================
client.on("debug", (info) => {
  console.log("🔍 DEBUG:", info);
});

client.on("warn", (info) => {
  console.log("⚠️ WARN:", info);
});

client.on("error", (error) => {
  console.error("❌ CLIENT ERROR:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("⚠️ UNHANDLED REJECTION:", error);
});

process.on("uncaughtException", (error) => {
  console.error("⚠️ UNCAUGHT EXCEPTION:", error);
});

// ==========================
// CARGA DE COMANDOS
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
// CARGA DE EVENTOS
// ==========================
const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (!event?.name) continue;

    if (event.once) {
  client.once(event.name, (...args) => event.execute(...args));
} else {
  client.on(event.name, (...args) => event.execute(...args));
}
    console.log(`🎧 Evento cargado: ${event.name}`);
  }
}

// ==========================
// TEST DE CONEXIÓN A DISCORD
// ==========================
https.get("https://discord.com/api/v10/gateway", (res) => {
  console.log("🌐 Gateway HTTP:", res.statusCode);

  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("🌐 Gateway respuesta:", data);
  });
}).on("error", (err) => {
  console.error("❌ Gateway ERROR:", err);
});

// ==========================
// LOGIN TEST CRÍTICO
// ==========================
console.log("🚀 Intentando login...");

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("✅ LOGIN RESUELTO (Discord aceptó el token)");
  })
  .catch((err) => {
    console.error("❌ LOGIN ERROR DETECTADO:");
    console.error(err);
  });