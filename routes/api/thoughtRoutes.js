const router = require("express").Router();
const { getSingleThought, getThoughts, createThought, addReaction, deleteReaction, deleteThought, updateThought } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionID").delete(deleteReaction);

module.exports = router;
