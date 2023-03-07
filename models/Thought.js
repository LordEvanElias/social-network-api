const { Schema } = require("mongoose");

// TODO Import dateFormat from "../utils/dataFormat"

const thoughtSchema = new Schema(
  {
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: [{ type: String, required: true }],
    createdAt: [{ type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) }],
  },
  reactions: [reactionSchema],
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
