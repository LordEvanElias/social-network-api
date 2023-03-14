const router = require("express").Router();
const { getSingleThought, getThoughts, getAllThoughts, createThought, addReaction } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/").get(getAllThoughts);

router.route("/:thoughtId").get(getSingleThought);

router.route("/:thoughtId/reaction").post(addReaction);

module.exports = router;
