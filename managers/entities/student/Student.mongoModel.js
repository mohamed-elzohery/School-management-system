const mongoose = require("mongoose");

// Schema is emptied as we delegated validation to pineapple
const StudentSchema = new mongoose.Schema({
  name: String,
  classroomID: {
    ref: "Classroom",
    type: mongoose.Schema.ObjectId,
  },
  schoolID: {
    ref: "School",
    type: mongoose.Schema.ObjectId,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
