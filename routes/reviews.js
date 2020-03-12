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
router.put('/:id', (req, res, next) => {
	res.send('UPDATE  /posts/:id/reviews/review_id');
});

/* DELETE review destroy /review/:review_id */
router.delete('/:id', (req, res, next) => {
	res.send('DELETE /posts/:id/reviews/:review_id');
});

module.exports = router;
