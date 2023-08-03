const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketIO = require('socket.io')
app.use(cors());

app.use(cors({
	origin: "*",
	credentials: true
}))

const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data)
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(8000, () => {
  console.log("SERVER IS RUNNING");
});