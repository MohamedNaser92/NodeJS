import userModel from '../../DB/models/user.model.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const getAllUser = async (req, res) => {
	try {
		let allData = await userModel.find();
		res.status(200).json({ message: 'All users', allData });
	} catch (err) {
		res.json({ message: 'Error' });
	}
};

const signUp = async (req, res) => {
	try {
		let { email } = req.body;
		let emailIsExist = await userModel.findOne({ email: email });
		emailIsExist && res.status(409).json({ message: 'Already registered' });
		// if (emailIsExist) {
		// 	res.status(409).json({ message: 'Already registered' });
		if (!emailIsExist) {
			let hashedPassword = bcrypt.hashSync(req.body.password, 7);

			let addedUser = await userModel.insertMany({
				...req.body,
				password: hashedPassword,
			});
			res.json({ message: 'Successfully Sign Up', addedUser });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error in Sign Up' });
	}
};

const signIn = async (req, res) => {
	try {
		let userIsExist = await userModel.findOne({ email: req.body.email });

		if (!userIsExist) {
			res
				.status(409)
				.json({ message: "Email doesn't Exist,Yoy have to register first " });
		} else {
			let matched = bcrypt.compareSync(req.body.password, userIsExist.password);
			if (matched) {
				res.status(200).json({ message: 'Successfully Sign in' });
			} else {
				res.json({ message: 'Wrong password' });
			}
		}
	} catch (err) {
		res.status(500).json({ message: 'Error in Sign In' });
	}
};
const updateUser = async (req, res) => {
	try {
		let { id } = req.params;
		let updatedUser = await userModel.findByIdAndUpdate(
			id,
			{
				userName: req.body.userName,
				password: req.body.password,
				age: req.body.age,
				phone: req.body.phone,
			},
			{ new: true }
		);
		if (!updatedUser) {
			res.status(404).json({ message: 'User not Found' });
		} else {
			res
				.status(200)
				.json({ message: 'User Updated Successfully', updatedUser });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error' });
	}
};

const deletUser = async (req, res) => {
	try {
		let { id } = req.params;

		let deletedUser = await userModel.findByIdAndDelete(id);
		if (!deletedUser) {
			res.status(404).json({ message: 'User not Found' });
		} else {
			res
				.status(200)
				.json({ message: 'User Deleted Successfully', deletedUser });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error in Deleting User' });
	}
};

const searchUser = async (req, res) => {
	try {
		let { x, y } = await req.params;
		const users = await userModel.find({
			userName: { $regex: new RegExp('^' + x, 'i') },
			age: { $lt: y },
		});

		res.status(200).json({ message: 'Search Result', users });
	} catch (err) {
		res.status(500).json({ message: 'Error' });
	}
};

const getUsersWithPosts = async (req, res) => {
	try {
		const usersWithPosts = await userModel
			.find()
			.populate('posts', 'title content date');
		res.status(200).json({
			message: 'Users profile with thier posts:',
			usersWithPosts,
		});
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Eroorr in getting users with thier posts' });
	}
};

export {
	getAllUser,
	signUp,
	signIn,
	deletUser,
	updateUser,
	searchUser,
	getUsersWithPosts,
};
