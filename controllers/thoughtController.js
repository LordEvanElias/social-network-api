const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((reaction) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.reactionId })
      .select("-__v")
      .populate("reactions")
      .populate("thoughts")
      .then((thought) => (!thought ? res.status(404).json({ message: "This thought doesn't seem to exist." }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          { $push: { thoughts: thought._id } },

          { new: true }
        );
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.reactionId }, { $set: req.body }, { runValidators: true, new: true })
      .then((reaction) => (!reaction ? res.status(404).json({ message: "This thought doesn't seem to exist." }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.reactionId })
      .then((reaction) => {
        return Thought.deleteMany({
          _id: { $in: user.thoughts },
        });
      })
      .then(() => {
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought found with that ID :(" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
};
