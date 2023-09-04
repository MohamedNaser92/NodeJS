import express from 'express';
const app = express();
app.use(express.json());
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

//1- GetAllUsers
app.get('/user', (req, res) => {
	res.json(user);
	// console.log(user);
});

//2- AddUser
app.post('/addUser', (req, res) => {
	let { id, name, age } = req.body;
	let isUserExist = user.find((ele) => ele.id == id);
	if (isUserExist) {
		res.json({ message: 'Already exist' });
	} else {
		user.push(req.body);
		// console.log(req.body);
		res.json({ message: 'Successfully Added', user });
	}
});

//3-Get all users sorted alphabetically by name:
app.get('/sortUser', (req, res) => {
	const sortedUser = user.slice().sort((a, b) => a.name.localeCompare(b.name));
	res.json({ sortedUser });
});

//4 - delete user;
app.delete('/user', (req, res) => {
	let { id } = req.body;
	let deletedUser = user.filter((ele) => ele.id != id);
	if (deletedUser.length == user.length) {
		res.json({ message: 'User not found' });
	} else {
		let user = deletedUser;
		res.json({ message: 'User Successfully Deleted', user });
	}
});

//5- update user

app.patch('/user', (req, res) => {
	let userIndex = user.findIndex((ele) => ele.id == req.body.id);
	if (userIndex > -1) {
		user[userIndex].name = req.body.name;
		user[userIndex].age = req.body.age;
		res.json({ message: 'Updated Successfully', user });
	} else {
		res.json({ mesaage: 'User not found' });
	}
});

//6- search user by id

app.post('/user', (req, res) => {
	let searchUserId = user.find((user) => user.id == req.body.id);
	let searchUserName = user.find((user) => user.name == req.body.name);
	if (searchUserId != undefined) {
		res.json(searchUserId);
	} else if (searchUserName != undefined) {
		res.json(searchUserName);
	} else {
		res.json({ message: 'User not found' });
	}
});

// ---------------------------------Posts-----------------------

//1- Get All Post
app.get('/post', (req, res) => {
	res.json(post);
	// console.log(user);
});

//2- Add Post
app.post('/addPost', (req, res) => {
	// let { id, user, content } = req.body;

	post.push(req.body);
	// console.log(req.body);
	res.json({ message: 'Post Added', post });
});

//3-Get all Posts reversed :
app.get('/sortPostReversed', (req, res) => {
	const sortPostReversed = post.slice().reverse();
	res.json(sortPostReversed);
});

//4 - delete Post;
app.delete('/post', (req, res) => {
	let { id } = req.body;
	let deletedPost = post.filter((ele) => ele.id != id);
	if (deletedPost.length == user.length) {
		res.json({ message: 'Post not found' });
	} else {
		let post = deletedPost;
		res.json({ message: 'Post Successfully Deleted', post });
	}
});

//5- update Post

app.patch('/post', (req, res) => {
	let postIndex = post.findIndex((ele) => ele.id == req.body.id);
	if (postIndex > -1) {
		post[postIndex].content = req.body.content;
		res.json({ message: 'Updated Successfully', post });
	} else {
		res.json({ mesaage: 'User not found' });
	}
});

//6- ssearch post by id

app.post('/post', (req, res) => {
	let searchPostId = post.find((post) => post.id == req.body.id);
	if (!searchPostId) {
		res.json({ message: 'Post not found' });
	} else {
		res.json(searchPostId);
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
