const { Schema, Types } = require("mongoose");

// Define the sub-document schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionText: {
    type: String,
    required: true,
    maxlength: 100,
  },
  username: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reactionSchema;