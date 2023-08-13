const router = require("express").Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} from "../../controllers/user-controller";

// GET and POST to get all users and to create a user
router.route("/").get(getAllUsers).post(createUser);

// GET one, PUT, and DELETE to get, update, and delete a user by its _id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// POST and DELETE to add and remove a friend to a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export default router;
