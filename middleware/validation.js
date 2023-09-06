const validationBody = (schema) => {
	return (req, res, next) => {
		let { error } = schema.validate(req.body, {
			abortEarly: false,
		});
		// console.log(error, 'validationRes');

		if (error) {
			res.status(400).json({ message: 'Validation error', error });
		} else {
			next();
		}
	};
};
const validationParams = (schema) => {
	return (req, res, next) => {
		let { error } = schema.validate({ id: req.params.id });
		// console.log(error, 'validationRes');

		if (error) {
			res.status(400).json({ message: 'Validation error', error });
		} else {
			next();
		}
	};
};

export { validationBody, validationParams };
