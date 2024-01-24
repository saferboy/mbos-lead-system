import { RequestHandler } from 'express'

import Joi from 'joi'

export const queryValidate = (joiSchema: Joi.ObjectSchema): RequestHandler => {
	return async (req, res, next) => {
		const query = req.query

		const { error } = joiSchema.validate(query, {
			abortEarly: false
		})

		if (error) {
			res.status(400).send({
				message: 'Bad Request',
				errors: error.details.map(detail => ({
					message: detail.message,
					path: detail.path
				}))
			})
			return
		}

		next()
	}
}
