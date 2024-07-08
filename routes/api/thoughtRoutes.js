const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/tags/:tagId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;










//const router = require('express').Router();

// const {
//   getAllThoughts,
//   getThoughtById,
//   createThought,
//   updateThought,
//   deleteThought,
//   // addReaction,
//   // removeReaction
// } = require('../../controllers/thoughtController');

// router.route('/').get(getAllThoughts).post(createThought);

// router.route('/thought:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// // router
// //   .route('/:thoughtId/reactions')
// //   .post(addReaction)
// //   .delete(removeReaction);

// module.exports = router;

