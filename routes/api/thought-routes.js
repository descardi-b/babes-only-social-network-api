const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

// directs to /api/thought GET route
router.route('/').get(getAllThoughts)

// directs to /api/thought/:id GET, PUT, and DELETE routes
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// directs to /api/thought/:userId POST route
router.route('/:userId').post(createThought)

// directs to /api/thought/:thoughtId/reactions POST route
router.route('/:id/reactions').post(addReaction)

// directs to /api/thought/:thoughtId/reactions/reactionId DELETE route
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router;