module.exports = {
  createClassroom: [
    {
      model: "title",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
    {
      model: "status",
      type: "string",
      required: false,
    },
  ],
  updateClassroom: [
    {
      model: "title",
      type: "string",
      length: { min: 3, max: 100 },
    },
    {
      model: "status",
      type: "string",
      required: false,
    },
  ],
};
