module.exports = (client) => {
  const inflationAI = require("../utils/inflationAI");

  setInterval(async () => {
    await inflationAI.update(client.db);
    console.log("🧠 Economía actualizada automáticamente");
  }, 60000); // cada 1 minuto
};