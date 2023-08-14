const User = require("../models/User");

// Object of user methods
const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
                .populate("thoughts")
                .select("-__v")
                .sort({ _id: -1 });

            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate("thoughts")
                .select("-__v");

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            // Add friendId to userId's friend list
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user found with this userId" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                // Remove friendId from userId's friend list
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user found with this userId" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
