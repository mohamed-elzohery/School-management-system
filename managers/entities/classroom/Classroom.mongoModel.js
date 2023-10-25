const mongoose = require("mongoose");

// Schema is emptied as we delegated validation to pineapple
const ClassroomSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    default: "available",
  },
  schoolID: {
    ref: "School",
    type: mongoose.Schema.ObjectId,
  },
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
