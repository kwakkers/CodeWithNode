const faker = require('faker');
const Post = require('./models/post');
const cities = require('./cities');

async function seedPosts () {
	await Post.deleteMany({});
	for (const i of new Array(600)) {
		const random1000 = Math.floor(Math.random() * 1000);
		const random5 = Math.floor(Math.random() * 6);
		const title = faker.lorem.word();
		const description = faker.lorem.text();
		const postData = {
			title,
			description,
			location    : `${cities[random1000].city}, ${cities[random1000]
				.state}`,
			geometry    : {
				type        : 'Point',
				coordinates : [
					cities[random1000].longitude,
					cities[random1000].latitude
				]
			},
			price       : random1000,
			avgRating   : random5,
			author      : '5e69f1a53e97606d38332633',
			images      : [
				{
					url :
						'https://res.cloudinary.com/dujmpqtlf/image/upload/v1585731457/surf-shop/surfboard_jw18jo.jpg'
				}
			]
		};
		let post = new Post(postData);
		post.properties.description = `<strong><a href="/posts/${post._id}">${title}</a></strong><p>${post.location}</p><p>${description.substring(
			0,
			20
		)}...</p>`;
		await post.save();
	}
	console.log('600 new posts created');
}

module.exports = seedPosts;
