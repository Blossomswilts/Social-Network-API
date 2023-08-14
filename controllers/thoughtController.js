const { User } = require("../models/User");
const { Thought } = require("../models/Thought");

// Object of thought methods
const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            console
                .log(thoughts)
                .populate("reactions")
                .select("-__v")
                .sort({ _id: -1 });

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .populate("reactions")
                .select("-__v");

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Update user's thoughts array field for new thought
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with this id!" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.id,
            });
            // Update user's thoughts array field for removed thought
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );
            //Validate user and thought to remove
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            } else if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with this id!" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add reaction to thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with this id!" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove reaction from thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought with this id!" });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;
