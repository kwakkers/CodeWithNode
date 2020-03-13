require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const createError = require('http-errors');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverrride = require('method-override');
//const seedPost = require('./seeds');

//seedPost();

// require routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');

const app = express();

// connect to the database
const uri = 'mongodb://localhost:27017/surf-shop';

// const uri =
// 	'mongodb+srv://' +
// 	process.env.DATABASEUSER +
// 	':' +
// 	process.env.DATABASEPW +
// 	'@cluster0-qdhmd.mongodb.net/surf-shop?retryWrites=true&w=majority';

//console.log(uri);
const opts = {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useFindAndModify   : false,
	useCreateIndex     : true
};

mongoose.connect(uri, opts);
// .then(() => {
// 	console.log('connected');
// })
// .catch((err) => {
// 	console.log('ERROR', err.message);
// });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conecction Errors'));
db.once('open', () => {
	console.log("We're connected");
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverrride('_method'));

// Configure session then passport
app.use(
	session({
		secret            : 'the devil is in the detail',
		resave            : false,
		saveUninitialized : true
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variable middleware
app.use(function (req, res, next) {
	req.user = {
		_id      : '5e69f1a53e97606d38332633',
		username : 'les'
	};

	// req.user = {
	// 	_id      : '5e6a6367bf98e756742076b1',
	// 	username : 'jan'
	// };
	res.locals.currentUser = req.user;
	// set default page title
	res.locals.title = 'Surf Shop';
	// set success flash mesage
	res.locals.success = req.session.success || '';
	delete req.session.success;
	// set error flash message
	res.locals.error = req.session.error || '';
	delete req.session.error;
	// continue on to mext function in middleware chain
	next();
});

// Mount Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// // set locals, only providing error in development
	// res.locals.message = err.message;
	// res.locals.error = req.app.get('env') === 'development' ? err : {};

	// // render the error page
	// res.status(err.status || 500);
	// res.render('error');
	console.log(err);
	req.session.error = err.message;
	res.redirect('back');
});

module.exports = app;
