const express = require("express");
const app = express();

module.exports = (client) => {

  app.get("/stats", async (req, res) => {
    const db = client.db;

    const market = await db.get("market") || [];

    res.json({
      marketSize: market.length,
      timestamp: Date.now()
    });
  });

  app.listen(3000, () => {
    console.log("🌐 Dashboard running on port 3000");
  });
};