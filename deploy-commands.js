const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { clientId, token, guildId } = require("./config.json");

const commands = [];
const foldersPath = path.join(__dirname, "commands");

// 📦 leer carpetas
const commandFolders = fs.readdirSync(foldersPath).filter(folder =>
  fs.statSync(path.join(foldersPath, folder)).isDirectory()
);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);

  const commandFiles = fs.readdirSync(commandsPath).filter(file =>
    file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    try {
      const command = require(filePath);

      if (!command.data) {
        console.log(`❌ SIN DATA: ${filePath}`);
        continue;
      }

      if (!command.data.toJSON) {
        console.log(`❌ DATA MAL FORMADO: ${filePath}`);
        continue;
      }

      const json = command.data.toJSON();

      // 🧠 VALIDACIÓN EXTRA (ATRAPA EL undefined)
      if (!json.name || typeof json.name !== "string") {
        console.log(`❌ NAME INVALIDO: ${filePath}`);
        continue;
      }

      if (!json.description || typeof json.description !== "string") {
        console.log(`❌ DESCRIPTION INVALIDA: ${filePath}`);
        continue;
      }

      commands.push(json);
      console.log(`📦 Cargado: ${json.name}`);

    } catch (err) {
      console.log(`❌ ERROR EN ARCHIVO: ${filePath}`);
      console.error(err);
    }
  }
}

// 🔥 REST API
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("🚀 Registrando comandos...");

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(`✅ Listo! Total comandos: ${commands.length}`);

  } catch (error) {
    console.error("❌ ERROR REGISTRANDO COMANDOS:");
    console.error(error);
  }
})();