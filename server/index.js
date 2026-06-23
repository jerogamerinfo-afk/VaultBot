require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { gameTick } = require("../game-engine/flow");
const { world } = require("../world/state");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());

/* =========================
   🌍 API MMO
========================= */

app.get("/world", (req, res) => {
  res.json(world);
});

/* =========================
   📡 SOCKET CONNECTION
========================= */

io.on("connection", (socket) => {

  console.log("🟢 Player connected:", socket.id);

  socket.on("join_world", (player) => {
    world.players[player.id] = {
      ...player,
      hp: 100,
      inCombat: false
    };
  });

  socket.on("player_action", (data) => {
    const player = world.players[data.playerId];

    if (!player) return;

    player.lastInput = {
      action: data.action,
      actionTime: Date.now()
    };

    if (data.action === "attack_boss") {
      player.inCombat = true;
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Player disconnected:", socket.id);
  });
});

/* =========================
   🎮 GAME LOOP START
========================= */

gameTick(io);

/* =========================
   🚀 START SERVER
========================= */

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 MMO SERVER RUNNING ON PORT ${PORT}`);
});