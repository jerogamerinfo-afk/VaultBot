const express = require("express");
const app = express();
const db = require("../db"); // tu db real

app.use(express.static("public"));

app.get("/api/economy", async (req, res) => {
  const all = await db.all();

  const totalItems = all
    .filter(x => x.id.startsWith("album_"))
    .reduce((a, b) => a + (b.value.length || 0), 0);

  const market = await db.get("market_items") || [];

  res.json({
    totalItems,
    marketSize: market.length
  });
});

app.listen(3000, () => console.log("🌐 Dashboard activo en puerto 3000"));