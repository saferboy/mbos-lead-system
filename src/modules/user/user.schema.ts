import Joi from 'joi'

export const LoginSchema = Joi.object({
	username: Joi.string().min(4).required(),
	password: Joi.string().min(4).required()
})
