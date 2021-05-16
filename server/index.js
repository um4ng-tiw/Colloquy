const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://utiwari18:umang1806@cluster0.audch.mongodb.net/Colloquy?retryWrites=true&w=majority";
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("useCreateIndex", true);
const Messages = require("./models/messages");
const userList = require("./models/userlist");
const contactList = require("./models/contactList");

const app = require("express")();
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Middleware for getting the username and name
io.use((socket, next) => {
  const username = socket.handshake.auth.userName;
  const name = socket.handshake.auth.name;
  const dpUrl = socket.handshake.auth.imgUrl;
  socket.username = username;
  socket.name = name;
  socket.dpUrl = dpUrl;
  console.log(socket.username);
  console.log(socket.name);
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      name: socket.name,
      dpUrl: socket.dpUrl,
      key: id,
    });
  }

  socket.emit("users", users);

  Messages.find()
    .or([{ toUser: socket.username }, { fromUser: socket.username }])
    .then((result) => {
      socket.emit("db-messages-output", result);
    });

  contactList.find({ user: socket.username }).then((result) => {
    socket.emit("fetch-contact", result);
  });

  console.log("User list", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    name: socket.name,
    dpUrl: socket.dpUrl,
    key: socket.id,
    self: false,
  });

  socket.on("new-user-sending", ({ userName, name, imgUrl }) => {
    const newUserDB = new userList({ userName, name, imgUrl });
    try {
      newUserDB.save();
    } catch (err) {
      console.log("Duplicate value");
    }
  });

  socket.on("contact-list-db", ({ user, contact }) => {
    const newContact = new contactList({ user, contact });
    newContact.save();
  });

  socket.on("private message", ({ content, to }) => {
    console.log("Content:", content, " To:", to);
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  socket.on("database-message", ({ toUser, content, fromSelf, fromUser }) => {
    const message = new Messages({ toUser, content, fromSelf, fromUser });
    message.save();
  });

  /*Video call events, we havent added end call */

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) =>
    io.to(data.to).emit("callAccepted", data.signal)
  );

  socket.on("callEnded", (data) => {
    console.log("Emitting callended");
    io.to(data.to).emit("callEnded");
  });
});

http.listen(4200, () => {
  console.log("Listening on port 4200");
});
