const { User } = require('../models');

const UserController = {

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData)) 
        .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) {
        User.find({})

        // populate thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get a single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // populate thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id found!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id found!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$push: {friends: params.friendId}},  {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id found!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    // delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId }}, { new: true })
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id foudn!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = UserController;