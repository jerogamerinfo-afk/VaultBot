const express = require("express");
const app = express();

app.use(express.json());

// guardar estado jugador
app.post("/player/save", (req, res) => {

  const { id, data } = req.body;

  console.log("Saving player:", id);

  res.json({ ok: true });
});

// leaderboard global
app.get("/leaderboard", (req, res) => {

  res.json([
    { name: "Jero", level: 99 },
    { name: "Player2", level: 87 }
  ]);
});

app.listen(4000, () => {
  console.log("🎮 MMORPG API RUNNING");
});