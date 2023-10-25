const mongoose = require("mongoose");

// Schema is emptied as we delegated validation to pineapple
const SchoolSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
});

module.exports = mongoose.model("School", SchoolSchema);
