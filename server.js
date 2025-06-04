const express = require("express");
const app = express();
const http = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: http });

wss.on("connection", function connection(ws) {
  console.log("[WS] New connection");

  ws.on("message", function incoming(message) {
    // Echo or relay to other clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
