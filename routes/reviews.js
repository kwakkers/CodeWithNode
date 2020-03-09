const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET review index /posts/:id/reviews */
router.get('/', (req, res, next) => {
	res.send('INDEX /posts/:id/reviews');
});

/* Post review create /posts/:id/reviews */
router.post('/', (req, res, next) => {
	res.send('CREATE /posts/:id/reviews');
});

/* GET review show /posts/:id/reviews/:review_id */
router.get('/:review_id', (req, res, next) => {
	res.send('SHOW /posts/:id/reviews/:review_id');
});

/* GET review edit /posts/:id/reviews/review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
	res.send('EDIT /posts/:id/reviews/review_id/edit');
});

/* PUT review update  /posts/:id/reviews/review_id */
router.put('/:id', (req, res, next) => {
	res.send('UPDATE  /posts/:id/reviews/review_id');
});

/* DELETE review destroy /review/:review_id */
router.delete('/:id', (req, res, next) => {
	res.send('DELETE /posts/:id/reviews/:review_id');
});

module.exports = router;
