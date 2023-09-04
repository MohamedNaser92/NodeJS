const http = require('http');
const url = require('url');
const fs = require('fs');

const user = [
	{
		id: 1000,
		name: 'Mohamed',
		age: 30,
	},
	{
		id: 1001,
		name: 'Nada',
		age: 24,
	},
	{
		id: 1003,
		name: 'Hady',
		age: 29,
	},
];
let post = [
	{
		id: 100,
		user: 'Sara',
		content: 'Hi 🙋‍♀️',
	},
	{
		id: 104,
		user: 'Moahemd',
		content: 'Amazing🔥',
	},
	{
		id: 105,
		user: 'Amr',
		content: 'I did It😎',
	},
];

const server = http.createServer(function (req, res) {
	// Show user
	if ((req.url == '/' || req.url == '/user') && req.method == 'GET') {
		res.end(JSON.stringify(user));
	} else if (req.url == '/post' && req.method == 'GET') {
		// Show Posts

		res.end(JSON.stringify(post));
	} else if (req.url == '/addUser' && req.method == 'POST') {
		//add User

		req.on('data', function (chunk) {
			user.push(JSON.parse(chunk));
			res.end();
		});
	} else if (req.url == '/addPost' && req.method == 'POST') {
		// Add Post

		req.on('data', function (chunk) {
			post.push(JSON.parse(chunk));
			res.end();
		});
	} else if (req.url == '/userSort' && req.method == 'GET') {
		// Sorting User

		const sortedUser = user
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));
		res.end(JSON.stringify(sortedUser));
		// reverse Posts
	} else if (req.url == '/reversedPost' && req.method == 'GET') {
		const reversedPost = post.slice().reverse();
		res.end(JSON.stringify(reversedPost));
	} else if (req.url == '/deleteUser' && req.method == 'DELETE') {
		//Delete user

		req.on('data', function (chunk) {
			let deleteUSer = user.filter((user) => user.id != JSON.parse(chunk).id);
			res.end(JSON.stringify(deleteUSer));
		});
	} else if (req.url == '/deletePost' && req.method == 'DELETE') {
		//Delete Post

		req.on('data', function (chunk) {
			let deletePost = post.filter((post) => post.id != JSON.parse(chunk).id);
			res.end(JSON.stringify(deletePost));
		});
	} else if (req.url == '/updateUser' && req.method == 'PATCH') {
		//Update user

		req.on('data', function (chunk) {
			let updateUser = user.find((user) => user.id == JSON.parse(chunk).id);
			updateUser.name = JSON.parse(chunk).name;
			updateUser.age = JSON.parse(chunk).age;
			res.end(JSON.stringify(updateUser));
		});
	} else if (req.url == '/updatePost' && req.method == 'PATCH') {
		//Update Post

		req.on('data', function (chunk) {
			let updatePost = post.find((post) => post.id == JSON.parse(chunk).id);
			updatePost.name = JSON.parse(chunk).name;
			updatePost.content = JSON.parse(chunk).content;
			res.end(JSON.stringify(updatePost));
		});
	} else if (req.url == '/searchUser' && req.method == 'POST') {
		//Search user

		req.on('data', function (chunk) {
			let searchUser = user.find((user) => user.id == JSON.parse(chunk).id);
			res.end(JSON.stringify(searchUser.name));
		});
	} else if (req.url == '/searchPost' && req.method == 'POST') {
		//Search Post

		req.on('data', function (chunk) {
			let searchPost = post.find((post) => post.id == JSON.parse(chunk).id);
			res.end(JSON.stringify(searchPost.content));
		});
	} else {
		res.end('not found');
	}
});
server.listen(8000);
