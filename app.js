require("./DB/connectToDb");
// require("./primeryData/primeryCards")();
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const chatRouter = require("./Routes/Chats/chatRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const Chat = require("./Routes/Chats/chatModel");
const {
  validateChat,
} = require("./Routes/Chats/chatValidations/chatValidation");
const { Server } = require("socket.io");
const normalizeChat = require("./model/chats/NormalizeChat");

// Create an HTTP server
const server = http.createServer(app);

// Attach socket.io to the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // When a user joins a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // When a message is sent
  socket.on("send_message", async (data) => {
    try {
      // Validate incoming data first
      const { error } = validateChat(data);
      console.log(data);
      if (error) {
        console.error("Validation error:", error.details[0].message);
        return res.status(400).send(error.details[0].message); // return early if validation fails
      }
      // Create new chat and save it only if validation passes
      const normalizedMessage = normalizeChat(
        data,
        data.senderID,
        data.recepientID
      );
      const message = new Chat(normalizedMessage);
      await message.save();
      io.to(data.roomID).emit("receive_message", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // When a user leaves a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });
});

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/chats", chatRouter);

const PORT = 8181;
server.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://localhost:${PORT}`))
);
