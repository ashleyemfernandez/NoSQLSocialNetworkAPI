const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual property 'reactionCount'
commentSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// comment model with schema
const Comment = model("comment", commentSchema);

module.exports = Comment;