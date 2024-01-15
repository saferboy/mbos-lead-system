import { NextFunction, Request, Response } from 'express'

import { createError, isValid, parseDate } from '../../core'

import LeadStatus from './lead-status.service'

export async function createStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const name = req.body.name
		const oldStatus = await LeadStatus.findStatusByName(name)

		if (oldStatus?.name) {
			return res.status(400).json({
				message: 'This status has already been created'
			})
		}

		const newStatus = await LeadStatus.createStatus(name)

		return res.status(201).json({
			message: 'new status created',
			status: {
				id: newStatus.id,
				name: newStatus.name
			}
		})
	} catch (err) {
		next(err)
	}
}

export async function allStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const name = req.query.name

		if (!name) {
			const page = req.query.page ? +req.query.page : undefined
			const limit = req.query.limit ? +req.query.limit : undefined

			const total = await LeadStatus.allStatus(page, limit)

			const mapped = total.map(item => {
				return {
					id: item.id,
					name: item.name
				}
			})

			return res.status(200).json({
				message: 'Retrieve all status',
				status: mapped
			})
		}

		if (name) {
			const status = await LeadStatus.findStatusByName(name as string)

			if (!status) throw createError('Status not found', 404)

			return res.status(200).json({
				message: 'Retrieve status',
				status: {
					id: status.id,
					name: status.name
				}
			})
		}
	} catch (err) {
		next(err)
	}
}

export async function findStatusId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = +req.params.id

		const status = await LeadStatus.findStatusById(id)

		if (!status) {
			return res.status(404).json({
				message: 'Status not found'
			})
		}

		return res.status(200).json({
			message: 'Retrieve status',
			status
		})
	} catch (err) {
		next(err)
	}
}

export async function updateStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = +req.params.id

		const name = req.body.name

		const oldStatus = await LeadStatus.findStatusById(id)

		if (!oldStatus) {
			return res.status(404).json({
				message: 'Status not found'
			})
		}

		const status = await LeadStatus.updateStatus(id, name)

		return res.status(200).json({
			message: 'Status updated',
			status
		})
	} catch (err) {
		next(err)
	}
}

export async function removeStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = +req.params.id

		const oldStatus = await LeadStatus.findStatusById(id)

		if (!oldStatus) {
			return res.status(404).json({
				message: 'Status not found or already deleted'
			})
		}

		const status = await LeadStatus.deleteStatus(id)

		return res.status(200).json({
			message: 'Status deleted',
			status
		})
	} catch (err) {
		next(err)
	}
}

export async function getAllWithLeads(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { startDay, endDay } = req.query as {
			startDay?: string
			endDay?: string
		}

		if (startDay && endDay) {
			const fromDate = parseDate(startDay)
			const toDate = parseDate(endDay)

			if (!isValid(fromDate) || !isValid(toDate)) {
				return res.status(400).json({
					message: 'please enter the correct date'
				})
			}

			const incDate = new Date(endDay)
			incDate.setDate(incDate.getDate() + 1)

			const mapped = await LeadStatus.getAllWithStatus(fromDate, incDate)
			const board = mapped.map(i => {
				return {
					id: i.id,
					name: i.name,
					position: i.position,
					lead: i.lead.map(q => {
						return {
							id: q.id,
							title: q.title,
							description: q.description,
							full_name: q.full_name,
							phone: q.phone,
							email: q.email,
							created_at: q.created_at,
							updated_at: q.updated_at,
							target_id: q.target_id,
							lead_status: {
								id: q.LeadStatus.id,
								name: q.LeadStatus.name
							}
						}
					})
				}
			})
			return res.status(200).json({
				message: 'Board lead status',
				board
			})
		}

		const board = await LeadStatus.getAllWithStatus()
		res.send({
			message: 'Board',
			board: board.map(bil => {
				return {
					id: bil.id,
					name: bil.name,
					position: bil.position,
					lead: bil.lead
				}
			})
		})
	} catch (error) {
		next(error)
	}
}

export async function updatePosition(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const position = req.body.position
		const statusId = req.params.id

		const updatedStatus = await LeadStatus.updatePosition(+statusId, position)

		res.send({
			message: 'Updated Status position',
			status: updatedStatus
		})
	} catch (err) {
		next(err)
	}
}
