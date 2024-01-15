import Joi from 'joi'

import { Target } from '@prisma/client'


export const targetCreateScheme = Joi.object({
	name: Joi.string().min(3).required(),
	lifetime: Joi.date()
		.min(Date.now() + 24 * 60 * 60 * 1000)
		.optional(),
	description: Joi.string().min(1).optional()
})


export const targetUpdateScheme = Joi.object<Omit<Target, 'id'>>({
	name: Joi.string().min(3).optional(),
	lifetime: Joi.date()
		.min(Date.now() + 24 * 60 * 60 * 1000)
		.optional(),
	description: Joi.string().min(3).optional(),
	// link: Joi.string().uri().optional(),
	status: Joi.string().optional()
})
