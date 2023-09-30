const { User } = require("../models");
require("mongoose");

const connection = require("../config/connection");

// Seeds
const users = [
  {
    username: "Maribel",
    email: "maribel@outlook.com",
    comments: [],
  },
  {
    username: "Kevin",
    email: "kevin@outlook.com",
    comments: [],
  },
  {
    username: "Melody",
    email: "melody@outlook.com",
    comments: [],
  },
  {
    username: "Roman",
    email: "roman@outlook.com",
    comments: [],
  },

];

console.log(connection);

// Connect to db
connection.once("open", async () => {
  console.log("Connected to database");

  // Delete users, add seed data to db
  await User.deleteMany({});
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Complete!");
  process.exit(0);
});