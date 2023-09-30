const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual property 'friendCount'
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create User model using userSchema
const User = model("user", userSchema);

module.exports = User;