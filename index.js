const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow all origins for testing
});

app.get("/", (req, res) => {
  res.send("Socket.io server is running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("welcome", "Hello from server!");

  socket.on("message", (msg) => {
    console.log("Message:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
