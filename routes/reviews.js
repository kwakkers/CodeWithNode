const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../middleware');
const {
	reviewCreate,
	reviewUpdate,
	reviewDestroy
} = require('../controllers/reviews');

/* Post review create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT review update  /posts/:id/reviews/review_id */
router.put('/:review_id', asyncErrorHandler(reviewUpdate));

/* DELETE review destroy /review/:review_id */
router.delete('/:review_id', (req, res, next) => {
	res.send('DELETE /posts/:id/reviews/:review_id');
});

module.exports = router;
