import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import messageRoutes from "./routes/message.js";
import { Server } from "socket.io";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/chat", messageRoutes);

const port = 5000;

const url =
  "mongodb+srv://chrollo:chrollo@cluster0.2zw0wnw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(port, () => console.log(`listening on ${port}`));

const io = new Server(server, {cors: {origin: "*"}});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatsocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.message);
    }
  });
});
