const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController.js");

// GET and POST to get all thoughts and to create a thought
router.route("/").get(getAllThoughts).post(createThought);

// GET one, PUT, and DELETE to get, update, and delete a thought by its _id
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST and DELETE to add and remove a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
