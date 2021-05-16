const mongoose = require("mongoose");
const userListSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const userList = mongoose.model("userList", userListSchema);
module.exports = userList;
