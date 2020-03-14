const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const util = require('util');

module.exports = {
	// GET /
	async landingPage (req, res, next) {
		const posts = await Post.find({});
		res.render('index', {
			posts,
			mapBoxToken : mapBoxToken,
			title       : 'Surf Shop - Home'
		});
	},
	// Get /register
	getRegister (req, res, next) {
		res.render('register', { title: 'Register', username: '', email: '' });
	},

	// POST /Register method
	async postRegister (req, res, next) {
		try {
			const user = await User.register(
				new User(req.body),
				req.body.password
			);
			req.login(user, function (err) {
				if (err) return next(err);
				req.session.success = `Welcome to Surf Shop, ${user.username}!`;
				res.redirect('/');
			});
		} catch (err) {
			// passport-local-mongoose has a errpor handler for the username exiting
			// but not the password, so we will handle the password issue here
			const { username, email } = req.body;
			let error = err.message;
			if (
				error.includes('duplicate') &&
				error.includes('index: email_1 dup key')
			) {
				error = 'A user with the given email is already registered';
			}
			res.render('register', {
				title    : 'Register',
				username,
				email,
				error
			});
		}
	},

	// Get /login
	getLogin (req, res, next) {
		if (req.isAuthenticated()) return res.redirectTo('/');
		if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
		res.render('login', { title: 'Login' });
	},

	// Post /login
	async postLogin (req, res, next) {
		const { username, password } = req.body;
		const { user, error } = await User.authenticate()(username, password);
		if (!user && error) return next(error);
		req.login(user, function (err) {
			if (err) return next(err);
			req.session.success = `Welcome back, ${username}!`;
			const redirectUrl = req.session.redirectTo || '/';
			delete req.session.redirectTo;
			res.redirect(redirectUrl);
		});
	},

	// GET /logout
	getLogout (req, res, next) {
		req.logout(), res.redirect('/');
	},

	// Get /profile
	async getProfile (req, res, next) {
		const posts = await Post.find()
			.where('author')
			.equals(req.user._id)
			.limit(10)
			.exec();
		res.render('profile', { posts });
	},
	async updateProfile (req, res, next) {
		const { username, email } = req.body;
		const { user } = res.locals;
		if (username) user.username = username;
		if (email) user.email = email;
		await user.save();
		const login = util.promisify(req.login.bind(req));
		await login(user);
		req.session.success = 'Your profile has successfully updated';
		res.redirect('profile');
	}
};
