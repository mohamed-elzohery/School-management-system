module.exports = {
  createSchool: [
    {
      path: "title",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
    {
      path: "address",
      type: "string",
      required: false,
    },
    {
      path: "description",
      type: "string",
      length: { max: 500 },
      required: false,
    },
  ],
  updateSchool: [
    {
      path: "title",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
    {
      path: "address",
      type: "string",
      required: false,
    },
    {
      path: "description",
      type: "string",
      length: { max: 500 },
      required: false,
    },
  ],
};
