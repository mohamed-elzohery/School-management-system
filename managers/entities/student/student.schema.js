module.exports = {
  createStudent: [
    {
      model: "name",
      type: "string",
      length: { min: 3, max: 100 },
      required: true,
    },
    {
      model: "classroomID",
      required: true,
    },
  ],
  updateStudent: [
    {
      model: "name",
      type: "string",
      length: { min: 3, max: 100 },
    },
    {
      model: "classroomID",
    },
  ],
};
