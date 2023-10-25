module.exports = {
  createSchool: [
    {
      path: "name",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
  ],
  updateSchool: [
    {
      path: "_id",
      type: "string",
      required: true,
    },
    {
      path: "name",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
  ],
};
