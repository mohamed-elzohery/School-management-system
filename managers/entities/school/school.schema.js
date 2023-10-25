module.exports = {
  createSchool: [
    {
      path: "title",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
  ],
  updateSchool: [
    {
      path: "title",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
  ],
};
