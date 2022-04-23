const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// directs to /api/user GET, POST routes
router.route('/')
    .get(getAllUsers)
    .post(createUser)

// directs to /api/user/:id GET, POST, and DELETE routes
router.route('/:id')
    .get(getUserById)
    .post(updateUser)
    .delete(deleteUser)

// directs to /api/user/:id/friends/:friendId POST and DELETE routes
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;