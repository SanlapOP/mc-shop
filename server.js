const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Rcon } = require("rcon-client");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Works on both Render and localhost

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post("/give-rank", async (req, res) => {
  const { username, rank } = req.body;

  try {
    const rcon = await Rcon.connect({
      host: "192.168.29.57",   
      port: 25575,                   
      password: "GodsOP"  
    });

    const command = `/lp user ${username} parent add ${rank}`;
    const response = await rcon.send(command);
    await rcon.end();

    res.json({ success: true, command, response });

  } catch (error) {
    console.error("❌ RCON Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🛒 MC Shop running on http://localhost:${PORT}`);
});