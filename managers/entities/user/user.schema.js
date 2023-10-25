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
      required: true,
    },
    {
      model: "school",
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
      model: "school",
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
