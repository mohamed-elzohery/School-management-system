const Roles = require("../../config/constants/Roles");
const emojis = require("../../public/emojis.data.json");

module.exports = {
  _id: {
    path: "_id",
    length: { min: 1, max: 50 },
  },
  status: {
    path: "status",
    type: "string",
    label: "status",
    oneOf: ["available", "occupied", "under-maintenance"],
  },
  username: {
    path: "username",
    type: "string",
    length: { min: 3, max: 20 },
    custom: "username",
  },
  name: {
    path: "name",
    type: "string",
    length: { min: 3, max: 20 },
  },
  password: {
    path: "password",
    type: "string",
    length: { min: 8, max: 100 },
  },
  email: {
    path: "email",
    type: "string",
    length: { min: 3, max: 100 },
  },
  schoolID: {
    path: "schoolID",
  },
  classroomID: {
    path: "classroomID",
  },

  role: {
    path: "role",
    type: "string",
    oneOf: Object.values(Roles),
  },
  title: {
    path: "title",
    type: "string",
    length: { min: 3, max: 300 },
  },
  label: {
    path: "label",
    type: "string",
    length: { min: 3, max: 100 },
  },
  shortDesc: {
    path: "desc",
    type: "string",
    length: { min: 3, max: 300 },
  },
  longDesc: {
    path: "desc",
    type: "string",
    length: { min: 3, max: 2000 },
  },
  description: {
    path: "description",
    type: "string",
    length: { max: 2000 },
  },
  address: {
    path: "address",
    type: "string",
  },
  url: {
    path: "url",
    type: "string",
    length: { min: 9, max: 300 },
  },
  emoji: {
    path: "emoji",
    type: "Array",
    items: {
      type: "string",
      length: { min: 1, max: 10 },
      oneOf: emojis.value,
    },
  },
  price: {
    path: "price",
    type: "number",
  },
  avatar: {
    path: "avatar",
    type: "string",
    length: { min: 8, max: 100 },
  },
  text: {
    type: "String",
    length: { min: 3, max: 15 },
  },
  longText: {
    type: "String",
    length: { min: 3, max: 250 },
  },
  paragraph: {
    type: "String",
    length: { min: 3, max: 10000 },
  },
  phone: {
    type: "String",
    length: 13,
  },
  email: {
    type: "String",
    path: "email",
    regex:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  number: {
    type: "Number",
    length: { min: 1, max: 6 },
  },
  arrayOfStrings: {
    type: "Array",
    items: {
      type: "String",
      length: { min: 3, max: 100 },
    },
  },
  obj: {
    type: "Object",
  },
  bool: {
    type: "Boolean",
  },
};
