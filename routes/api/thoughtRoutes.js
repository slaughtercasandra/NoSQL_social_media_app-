const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require('../../controllers/ThoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:ThoughtId').get(getSingleThought);

module.exports = router;