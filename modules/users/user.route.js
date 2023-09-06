import express from 'express';
import {
	validationBody,
	validationParams,
} from '../../middleware/validation.js';
import {
	getAllUser,
	signUp,
	signIn,
	deletUser,
	updateUser,
	searchUser,
	getUsersWithPosts,
} from './user.controller.js';
import {
	signInValidationSchem,
	signUpValidationSchema,
	idValidationSchema,
} from './user.validation.js';

const userRoutes = express.Router();

userRoutes.get('/user', getAllUser);
userRoutes.post('/signUp', validationBody(signUpValidationSchema), signUp);
userRoutes.post('/signIn', validationBody(signInValidationSchem), signIn);
userRoutes.delete('/:id', validationParams(idValidationSchema), deletUser);
userRoutes.patch('/:id', validationParams(idValidationSchema), updateUser);
userRoutes.get('/searchUser/:x/:y', searchUser);
userRoutes.get('/user/userWithPosts', getUsersWithPosts);

export default userRoutes;
