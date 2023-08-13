const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/user-controller.js");

// GET and POST to get all users and to create a user
router.route("/").get(getAllUsers).post(createUser);

// GET one, PUT, and DELETE to get, update, and delete a user by its _id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// POST and DELETE to add and remove a friend to a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
