import express from 'express';
import {
	createPost,
	deletePost,
	updatePost,
	getAllPosts,
	getAllPostsWithOwners,
	postsSortedDescending,
} from './post.controller.js';
const postRoutes = express.Router();

postRoutes.post('/post', createPost);
postRoutes.delete('/post/:id', deletePost);
postRoutes.patch('/post/:id', updatePost);
postRoutes.get('/post', getAllPosts);
postRoutes.get('/post/postOwnerData', getAllPostsWithOwners);
postRoutes.get('/post/postSorted', postsSortedDescending);
export default postRoutes;
