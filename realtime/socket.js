const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const players = new Map();

wss.on("connection", (ws) => {

  ws.on("message", (msg) => {

    const data = JSON.parse(msg);

    players.set(data.id, data);

    // broadcast world update
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          type: "WORLD_UPDATE",
          players: Array.from(players.values())
        }));
      }
    });
  });
});

console.log("🌍 MMO Realtime Server running");

module.exports = wss;