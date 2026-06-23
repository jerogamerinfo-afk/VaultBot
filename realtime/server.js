const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

const players = new Map();

wss.on("connection", (ws) => {

  ws.on("message", (msg) => {

    const data = JSON.parse(msg);
    players.set(data.id, data);

    const worldState = {
      type: "WORLD_SYNC",
      players: Array.from(players.values())
    };

    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(worldState));
      }
    });
  });
});

console.log("🌍 MMO REALTIME RUNNING");