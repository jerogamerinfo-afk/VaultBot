const { resolveCombat } = require("../combat/combatEngine");
const { predict_style } = require("../ai/bossLearning");
const { world } = require("../world/state");

async function gameTick(io) {

  setInterval(async () => {

    for (const playerId in world.players) {

      const player = world.players[playerId];

      if (!player || !player.inCombat) continue;

      // 🧠 IA analiza al jugador
      const style = await predict_style(playerId);

      // 🐉 boss responde según IA
      const bossAction = getBossAction(style);

      // ⚔️ combate
      const result = resolveCombat(
        player,
        bossAction,
        player.lastInput || {}
      );

      // 💥 aplicar resultado
      player.hp -= result.damageTaken || 0;

      // 📡 enviar update a todos los clientes
      io.emit("game_update", {
        playerId,
        result,
        bossAction,
        player
      });
    }

  }, 100); // tick 10 veces por segundo
}

function getBossAction(style) {

  if (style === "aggressive_counter") {
    return { attack: 25, pattern: "counter_combo" };
  }

  if (style === "unpredictable") {
    return { attack: 18, pattern: "random_chain" };
  }

  return { attack: 15, pattern: "normal" };
}

module.exports = { gameTick };