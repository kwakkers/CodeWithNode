const faker = require('faker');
const Post = require('./models/post');

async function seedPosts () {
	await Post.remove({});

	for (const i of new Array(40)) {
		const post = {
			title       : faker.lorem.word(),
			description : faker.lorem.text(),
			author      : {
				_id      : '5e69f1a53e97606d38332633',
				username : 'les'
			}
		};
		await Post.create(post);
	}
	console.log('40 new psots created');
}

module.exports = seedPosts;
