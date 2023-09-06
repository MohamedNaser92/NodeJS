import Joi from 'joi';
const signUpValidationSchema = Joi.object({
	userName: Joi.string().min(3).max(12).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),
	password: Joi.string()
		.pattern(/^[A-Z][a-z]{3,10}$/)
		.required(),
	age: Joi.number().min(12),
});

const signInValidationSchem = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),
	password: Joi.string()
		.pattern(/^[A-Z][a-z]{3,10}$/)
		.required(),
});

const idValidationSchema = Joi.object({
	id: Joi.string().alphanum().length(24).required(),
});

export { signUpValidationSchema, signInValidationSchem, idValidationSchema };
