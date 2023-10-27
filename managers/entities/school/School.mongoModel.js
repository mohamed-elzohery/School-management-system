const mongoose = require("mongoose");
const UserMongoModel = require("../user/User.mongoModel");
const ClassroomMongoModel = require("../classroom/Classroom.mongoModel");

// Schema is emptied as we delegated validation to pineapple
const SchoolSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
});

SchoolSchema.pre("deleteOne", async function (next) {
  const schoolId = this._conditions._id;
  console.log(this);
  // Delete related User documents
  await mongoose.model("User").deleteMany({ schoolID: schoolId });

  // Delete related Classroom documents
  await mongoose.model("Classroom").deleteMany({ schoolID: schoolId });

  console.log("deleted", schoolId);
});

module.exports = mongoose.model("School", SchoolSchema);
