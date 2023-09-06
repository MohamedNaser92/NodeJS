import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	age: Number,
	gender: String,
	phone: String,
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
