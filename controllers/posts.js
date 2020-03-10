const Post = require('../models/post');

module.exports = {
	// Post Index
	async getPosts (req, res, next) {
		let posts = await Post.find({});
		res.render('posts/index', { posts });
	},

	// Posts New
	newPost (req, res, next) {
		res.render('posts/new');
	},

	// Posts Create Post
	async createPost (req, res, next) {
		//use req.body to create new Post
		let post = await Post.create(req.body);
		res.redirect(`/posts/${post.id}`);
	}
};
