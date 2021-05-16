const mongoose = require("mongoose");

const contactListSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  contact: {
    type: Object,
    required: true,
  },
});

const contactList = mongoose.model("contactList", contactListSchema);
module.exports = contactList;
