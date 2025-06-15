const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Rcon } = require("rcon-client");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post("/give-rank", async (req, res) => {
  const { username, rank } = req.body;

  try {
    const rcon = await Rcon.connect({
      host: "127.0.0.1",
      port: 25575,
      password: "GodsOP"
    });

    const command = `/lp user ${username} parent add ${rank}`;
    const response = await rcon.send(command);
    await rcon.end();

    res.json({ success: true, command, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("🛒 MC Shop running on http://localhost:3000");
});