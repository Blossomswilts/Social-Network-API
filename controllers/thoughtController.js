const { User, Thought } = require("../models");

// Create the thoughtController object
const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 }) // sort in DESC order by the _id value
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions", // populate reactions
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: "No thought found with this id!",
                    });
                    return;
                }
                // If thought is found, send 200
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create thought and add to user's thoughts array field
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                // add thought to user's thoughts array field
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No user found with this id!",
                    });
                    return;
                }
                // If user is found, send 200
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbThoughtData) => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: "No thought found with this id!",
                    });
                    return;
                }
                // If thought is found, send 200
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    // delete thought by id and remove from user's thoughts
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({
                        message: "No thought found with this id!",
                    });
                }
                // remove thought from user's thoughts array field
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No user found with this id!",
                    });
                    return;
                }
                // If user is found, send 200
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // add reaction to reactions array field
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: "No thought found with this id!",
                    });
                    return;
                }
                // If thought is found, send 200
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    // remove reaction from thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // remove reaction from reactions array field
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: "No thought found with this id!",
                    });
                    return;
                }
                // If thought is found, send 200
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
};

// export the thoughtController object
module.exports = thoughtController;
