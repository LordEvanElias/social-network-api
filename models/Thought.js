const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: [{ type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) }],
    username: [{ type: String, required: true }],
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

router.route("/").get(getAllThoughts);
router.route("/:thoughtId").get(getSingleThought);
router.route("/").post(createThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
