import mongoose from 'mongoose';

export const initConnection = () => {
	mongoose
		.connect('mongodb://127.0.0.1:27017/test-lab3')
		.then(() => console.log('DB Connected'))
		.catch((err) => console.log(err));
};
