const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const {
	reviewCreate,
	reviewUpdate,
	reviewDestroy
} = require('../controllers/reviews');

/* Post review create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT review update  /posts/:id/reviews/review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE review destroy /review/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDestroy));

module.exports = router;
