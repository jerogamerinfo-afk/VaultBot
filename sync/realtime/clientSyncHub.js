ws.on("connection", (socket) => {

  socket.on("join", (player) => {
    broadcast("player_join", player);
  });

  socket.on("action", (data) => {
    broadcast("world_update", data);
  });

});