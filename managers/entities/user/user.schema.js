module.exports = {
  createUser: [
    {
      model: "username",
      required: true,
    },
    {
      model: "email",
      required: true,
    },
    {
      model: "password",
      required: true,
    },
    {
      model: "role",
      required: false,
    },
    {
      model: "schoolID",
      required: true,
    },
  ],
  updateUser: [
    { model: "_id", required: true },
    {
      model: "username",
    },
    {
      model: "email",
    },
    {
      model: "password",
    },
    {
      model: "role",
      required: false,
    },
    {
      model: "schoolID",
    },
  ],
  login: [
    {
      model: "email",
      required: true,
    },
    {
      model: "password",
      required: true,
    },
  ],
};
