const mongoose = require("mongoose");

// Schema is emptied as we delegated validation to pineapple
const SchoolSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("School", SchoolSchema);
