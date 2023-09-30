const { connect, connection } = require("mongoose");

// Create db
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nosqlsocial";

// Mongoose & MongoDB
connect(connectionString);

module.exports = connection;