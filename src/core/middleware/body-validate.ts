import { RequestHandler } from 'express'

import Joi from 'joi'

export const bodyValidate = (joiScheme: Joi.Schema): RequestHandler => {
	return async (req, res, next) => {
		const body = req.body
		const { error } = joiScheme.validate(body, {
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
