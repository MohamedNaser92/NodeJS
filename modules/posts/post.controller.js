import postModel from '../../DB/models/post.model.js';
import userModel from '../../DB/models/user.model.js';
const createPost = async (req, res) => {
	const { title, content, userID } = req.body;
	try {
		const user = await userModel.findById(userID);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
		} else {
			const createdPost = new postModel({ title, content, userID });
			await createdPost.save();
			user.posts.push(createdPost._id);
			await user.save();
			res
				.status(201)
				.json({ message: 'Post Created Successfully', createdPost });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error occured when creating post' });
	}
};

const deletePost = async (req, res) => {
	let { id } = req.params;
	const { userID } = req.body;

	try {
		const deletedPost = await postModel.findOne({
			_id: id,
			userID: userID,
		});
		console.log({ deletedPost });
		if (!deletedPost) {
			res.status(403).json({ message: 'You can not delete this Post' });
		} else {
			await deletedPost.deleteOne({ _id: id });

			res
				.status(200)
				.json({ message: 'Post Deleted Successfully ', deletedPost });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error occured when deleting post' });
	}
};

const updatePost = async (req, res) => {
	let { id } = req.params;
	let { userID } = req.body;
	// let { title, content } = req.body;
	try {
		const post = await postModel.findOne({
			_id: id,
			userID: userID,
		});
		console.log(post);
		if (!post) {
			res.status(403).json({ message: 'You can not update this Post' });
		} else {
			const updatedPost = await postModel.findByIdAndUpdate(
				id,
				{
					title: req.body.title,
					content: req.body.content,
				},
				{ new: true }
			);

			res
				.status(200)
				.json({ message: 'Post Updated Successfully', updatedPost });
		}
	} catch (err) {
		res.status(500).json({ message: 'Eroorr in updating Post' });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const allPosts = await postModel.find();
		res.status(200).json({ message: 'All Posts:', allPosts });
	} catch (err) {
		res.status(500).json({ message: 'Erorr' });
	}
};

const getAllPostsWithOwners = async (req, res) => {
	try {
		const postsWithOwners = await postModel
			.find()
			.populate('userID', 'userName email age gender ');
		res.status(200).json({
			message: 'Posts with information of its owners',
			postsWithOwners,
		});
	} catch (err) {
		res.status(500).json({ message: 'Error with getting data' });
	}
};

const postsSortedDescending = async (req, res) => {
	try {
		const posts = await postModel.find().sort({ date: -1 });
		res
			.status(200)
			.json({ message: 'Posts sorting descending by date ', posts });
	} catch (err) {
		res.status(500).json({ message: 'Error with sorting posts descending ' });
	}
};

export {
	createPost,
	deletePost,
	updatePost,
	getAllPosts,
	getAllPostsWithOwners,
	postsSortedDescending,
};
