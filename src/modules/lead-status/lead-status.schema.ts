import Joi from 'joi'

/**
 * @swagger
 * components:
 *   schemas:
 *     LeadStatus:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: New lead-status for Lead
 */
export const leadStatusCreateScheme = Joi.object({
	name: Joi.string().min(3).required()
})

/**
 * @swagger
 * components:
 *   schemas:
 *     FindStatusById:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *           required: true
 *           description: The status's ID (must be a positive number).
 */
export const findStatusScheme = Joi.object({
	id: Joi.number().min(1).required()
})
