const express = require("express");
const app = express();

app.use(express.json());

// ejemplo: guardar estado del jugador
app.post("/player/save", async (req, res) => {

  const { userId, data } = req.body;

  // aquí iría MongoDB o Redis
  console.log("Saving player:", userId);

  res.json({ ok: true });
});

app.get("/leaderboard", async (req, res) => {

  res.json([
    { user: "player1", level: 50 },
    { user: "player2", level: 45 }
  ]);
});

app.listen(3000, () => {
  console.log("Backend MMORPG running");
});