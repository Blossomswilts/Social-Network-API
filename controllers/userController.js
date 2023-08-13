// Call user and thought models
const { User, Thought } = require("../models/User");

// Create the userController object try catch
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v", // don't need the __v field on thoughts
            })
            .select("-__v") // don't need the __v field on users
            .sort({ _id: -1 }) // sort in DESC order by the _id value
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts", // populate thoughts
                select: "-__v", // don't need the __v field on thoughts
            })
            .select("-__v") // don't need the __v field on users
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
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOne({ _id: params.id }),
            body,
            { new: true, runValidators: true }
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

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
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

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
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

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
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
};

// export the userController object
module.exports = userController;
