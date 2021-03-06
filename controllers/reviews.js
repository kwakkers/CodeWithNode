const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
	// Reviews Create
	async reviewCreate (req, res, next) {
		// find the post by its id and populate all reviews
		let post = await Post.findById(req.params.id)
			.populate('reviews')
			.exec();

		// has user reviewed the post
		let haveReviewed = post.reviews.filter((review) => {
			return review.author.equals(req.user._id);
		}).length;

		if (haveReviewed) {
			req.session.error =
				'Sorry, you can only create one review per post';
			return res.redirect(`/posts/${post.id}`);
		}

		// create the review
		req.body.review.author = req.user._id;
		let review = await Review.create(req.body.review);
		// assign review to post
		post.reviews.push(review);
		// save the post
		post.save();
		// redirect to the post
		req.session.success = 'Review created successfully!';
		res.redirect(`/posts/${post.id}`);
	},
	// Reviews Update
	async reviewUpdate (req, res, next) {
		await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
		req.session.success = 'Review updated successfully!';
		res.redirect(`/posts/${req.params.id}`);
	},
	// Reviews Destroy
	async reviewDestroy (req, res, next) {
		// find the post and remove the review from the reviews array in the posts model
		await Post.findByIdAndUpdate(req.params.id, {
			$pull : { reviews: req.params.review_id }
		});
		// Remove the review from the reviews collection
		await Review.findByIdAndRemove(req.params.review_id);
		req.session.success = 'Review deleted successfully!';
		res.redirect(`/posts/${req.params.id}`);
	}
};
