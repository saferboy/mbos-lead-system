import { RequestHandler } from 'express'

import { createError, isValid, parseDate, targetLink } from '../../core'
import { Lead } from '@prisma/client'

import LeadService from './lead.service'
import LeadStatus from '../lead-status/lead-status.service'

export const create: RequestHandler = async (req, res, next) => {
	try {
		const body = req.body
		const url = targetLink.deserialize(req.url)
		const status = (await LeadStatus.allStatus()).at(0)

		if (!status || !url) throw createError('Bad request', 404)

		await LeadService.create({
			leadData: { ...body, target_id: +url.target_id, status_id: status.id }
		})

		res.redirect('http://localhost:5173')
	} catch (e) {
		next(e)
	}
}

export const remove: RequestHandler = async (req, res, next) => {
	const id = req.params.id
	const user = res.locals.user

	try {
		const lead = await LeadService.remove(+id, user.id)
		res.send({
			message: 'Lead Archived',
			lead
		})
	} catch (e) {
		next(e)
	}
}

export const getAll: RequestHandler = async (req, res, next) => {
	try {
		const status = req.query.status as string | undefined

		const { startDay, endDay } = req.query as {
			startDay?: string
			endDay?: string
		}

		const page = req.query.page ? +req.query.page : undefined
		const limit = req.query.limit ? +req.query.limit : undefined

		if (startDay && endDay) {
			const fromDate = parseDate(startDay) // undefined > parse > undefined
			const toDate = parseDate(endDay) // undefined > parse > undefined

			if (!isValid(fromDate) || !isValid(toDate)) {
				return res.status(400).json({
					message: 'please enter the correct date'
				})
			}

			const incDate = new Date(endDay)
			incDate.setDate(incDate.getDate() + 1)

			const mapped = await LeadService.getAll(
				status,
				page,
				limit,
				fromDate,
				incDate
			)

			const leads = mapped.map(item => {
				return {
					id: item.id,
					title: item.title,
					description: item.description,
					full_name: item.full_name,
					phone: item.phone,
					email: item.email,
					created_at: item.created_at,
					updated_at: item.updated_at,
					target_id: item.target_id,
					lead_status: {
						id: item.LeadStatus.id,
						name: item.LeadStatus.name
					}
				}
			})

			res.send({
				message: 'All Leads',
				leads
			})
		}
		const mapped = await LeadService.getAll(status, page, limit)

		const leads = mapped.map(item => {
			return {
				id: item.id,
				title: item.title,
				description: item.description,
				full_name: item.full_name,
				phone: item.phone,
				email: item.email,
				created_at: item.created_at,
				updated_at: item.updated_at,
				target_id: item.target_id,
				lead_status: {
					id: item.LeadStatus.id,
					name: item.LeadStatus.name
				}
			}
		})
		res.send({
			message: 'All Leads',
			leads
		})
	} catch (e) {
		next(e)
	}
}

export const findById: RequestHandler = async (req, res, next) => {
	try {
		const leadId = +req.params.id

		const lead = await LeadService.findById(leadId)

		if (!lead) throw createError('Lead not found', 404)

		return res.status(200).json({
			message: 'Retrive lead',
			lead
		})
	} catch (e) {
		next(e)
	}
}

export const updateStatus: RequestHandler = async (req, res, next) => {
	const id = +req.params.id
	const body = req.body as { status_id: number }

	try {
		const lead = await LeadService.updateStatus(id, body.status_id)

		res.send({
			message: 'Status updated',
			lead
		})
	} catch (e) {
		next(e)
	}
}

export const update: RequestHandler = async (req, res, next) => {
	const id = +req.params.id
	const body = req.body as Omit<Lead, 'id'>

	try {
		const lead = await LeadService.update({ leadId: id, lead: body })

		return res.status(200).json({
			message: 'Updated lead',
			lead
		})
	} catch (e) {
		next(e)
	}
}
