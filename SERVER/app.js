import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { v4 } from 'uuid'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";


import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { createUser } from "./seeders/user.js";
import { createGroupChat, createMessagesInChat, createSingleChat } from "./seeders/chat.js";
import { ne } from "@faker-js/faker";



//start the server by npm run dev

//Connect Data Base
dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "rajdip";

const userSocketIDs = new Map()


connectDB(mongoURI)
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

// Create fake users
// createUser(10);

// createSingleChat(1);
// createGroupChat(10);

// createMessagesInChat("66b6ddd19a30774b75ac8db8",10);

const app = express();


const server = createServer(app);
const io = new Server(server, {})

//Using Middlewares Here
app.use(express.json()); //for accessing json data
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send(
    "Hello Earth This is home page  and Server is running on port 3000 "
  );
});

io.use((socket, next) => { });

io.on("connection", (socket) => {

  const user = {
    _id: "abcd",
    name: "Rajdip",
  };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);

  console.log("Client connected", socket.id);


  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: v4(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      chat: chatId,
      sender: user._id
    };

    const usersSocket = getSockets(members, userSocketIDs);
    io.to(usersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(usersSocket).emit(NEW_MESSAGE_ALERT, { chatId });


    console.log("New Message", messageForRealTime);

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }

  })
  //Disconnection event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    userSocketIDs.delete(user._id.toString());
  })
})

// Error Middleware
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});


export { adminSecretKey, envMode, userSocketIDs };
