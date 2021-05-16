const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  toUser: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  fromSelf: {
    type: Boolean,
    required: true,
  },
  fromUser: {
    type: String,
    required: true,
  },
});

const Messages = mongoose.model("messages", msgSchema);
module.exports = Messages;
