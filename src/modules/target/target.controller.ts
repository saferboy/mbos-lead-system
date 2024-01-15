import { RequestHandler } from 'express'

import { createError } from '../../core'
import { Target, TargetStatus } from '@prisma/client'

import { TargetService } from './target.service'

export const create: RequestHandler = async (req, res, next) => {
	const { name, lifeTime } = req.body as { name: string; lifeTime?: Date }

	try {
		const target = await TargetService.create(name, lifeTime)

		res.status(201).send({
			message: 'Target Created',
			target
		})
	} catch (e) {
		next(e)
	}
}

export const update: RequestHandler = async (req, res, next) => {
	const id = +req.params.id
	const body = req.body as Omit<Partial<Target>, 'id'>
	try {
		const oldTarget = await TargetService.findById(id)

		if (!oldTarget) throw createError('Target not found', 404)

		const target = await TargetService.update(id, body)

		return res.status(200).json({
			message: 'Target updated',
			target
		})
	} catch (e) {
		next(e)
	}
}

export const getAll: RequestHandler = async (req, res, next) => {
	try {
		const status = req.query.status as TargetStatus | undefined
		const mapped = await TargetService.getAll(status)

		const targets = mapped.map(i => {
			return {
				id: i.id,
				name: i.name,
				description: i.description,
				created_at: i.created_at,
				updated_at: i.updated_at,
				lifetime: i.lifetime,
				status: i.status
			}
		})

		return res.status(200).json({
			message: 'All Targets',
			targets
		})
	} catch (e) {
		next(e)
	}
}

export const generateLink: RequestHandler = async (req, res, next) => {
	try {
		const id = +req.params.id
		const body = req.body as { payload: string }
		const generatedLink = await TargetService.generateLink(id, body.payload)
		res.send({
			message: 'Link Generated',
			link: 'http://localhost:5173/' + generatedLink
		})
	} catch (err) {
		next(err)
	}
}
