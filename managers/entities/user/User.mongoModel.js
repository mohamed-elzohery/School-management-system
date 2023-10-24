const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema is emptied as we delegated validation to pineapple
const userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  role: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.password) {
    update.$set.password = await bcrypt.hash(update.$set.password, 12);
  }

  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
