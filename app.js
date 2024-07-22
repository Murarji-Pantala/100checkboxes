const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => res.render("index"));

const checkboxStates = new Array(100).fill(false);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("initialState", checkboxStates);

  socket.on("checkboxChange", ({ index, checked }) => {
    checkboxStates[index] = checked;
    io.emit("checkboxUpdate", { index, checked });
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
