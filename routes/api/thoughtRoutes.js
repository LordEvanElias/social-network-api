const router = require("express").Router();
const { getSingleThought, getThoughts, createThought, addReaction, deleteThought, updateThought } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reaction").post(addReaction);

module.exports = router;
