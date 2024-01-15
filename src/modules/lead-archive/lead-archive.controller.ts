import { RequestHandler } from 'express'

import { convertKeysToCamelCase, createError } from '../../core'

import LeadService from '../lead/lead.service'
import { LeadArchiveService } from './lead-archive.service'
import LeadStatus from '../lead-status/lead-status.service'

export const getAll: RequestHandler = async (req, res, next) => {
	try {
		const leadId = +req.params.leadId

		const foundLead = await LeadService.findById(leadId)

		if (!foundLead) throw createError('Lead not found')

		const mapped = await LeadArchiveService.getAll(leadId)

		const archives = mapped.map(async archive => ({
			id: archive.id,
			lead_id: archive.lead_id,
			comment: archive.comment,
			prev_status: {
				id: (await LeadStatus.findStatusById(archive.prev_status))?.id,
				name: (await LeadStatus.findStatusById(archive.prev_status))?.name
			},
			next_status: archive.next_status && {
				id: (await LeadStatus.findStatusById(archive.next_status))?.id,
				name: (await LeadStatus.findStatusById(archive.next_status))?.name
			},
			updated_at: archive.updated_at
		}))
		const promises = await Promise.all(archives)
		return res.status(200).json({
			message: 'All archives',
			archives: promises
		})
	} catch (error) {
		next(error)
	}
}

export const getById: RequestHandler = async (req, res, next) => {
	try {
		const archiveId = +req.params.id
		const archive = await LeadArchiveService.get(archiveId)

		if (!archive) {
			return res.status(404).json({
				message: 'Archive not found'
			})
		}

		return res.status(200).json({
			message: 'Archive retrieved',
			archive: convertKeysToCamelCase(archive)
		})
	} catch (error) {
		next(error)
	}
}

export const updateComment: RequestHandler = async (req, res, next) => {
	const id = +req.params.id
	const body = req.body as { comment: string }
	try {
		const archive = await LeadArchiveService.updateComment(id, body.comment)

		const foundArchive = await LeadArchiveService.get(id)

		if (!foundArchive) throw createError('Archive not found', 404)

		return res.status(200).json({
			message: 'Comment updated',
			archive
		})
	} catch (error) {
		next(error)
	}
}

export const addComment: RequestHandler = async (req, res, next) => {
	const id = +req.params.id
	const body = req.body as { comment: string }
	try {
		const archive = await LeadArchiveService.addComment(id, body.comment)

		return res.status(200).json({
			message: 'Comment added',
			archive
		})
	} catch (error) {
		next(error)
	}
}
