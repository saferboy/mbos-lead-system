import { createError } from "../../core/utils/createError";
import { Lead } from "@prisma/client";

import { prisma } from '../prisma/prisma.service'
import { LeadBody } from './lead.dto'


export default class LeadService {
	static async create(params: { leadData: LeadBody }) {
		const { leadData } = params

		const lead = await prisma.lead.create({
			data: leadData
		})

		// await prisma.leadArchive.create({
		// 	data: {
		// 		lead_id: lead.id,
		// 		user_id,
		// 		prev_status: lead.status_id
		// 	}
		// })

		return lead
	}

	static async findById(leadId: number) {
		const lead = await prisma.lead.findUnique({
			where: {
				id: leadId
			}
		})
		return lead
	}

	static async getAll(
		status?: string,
		page?: number,
		limit?: number,
		startDay?: Date,
		endDay?: Date
	) {
		const leads = prisma.lead.findMany({
			skip: page && (page - 1) * (limit ?? 0) + 1,
			take: limit,
			where: {
				created_at: {
					gte: startDay,
					lte: endDay
				},
				LeadStatus: {
					name: status
				}
			},

			select: {
				_count: true,
				id: true,
				title: true,
				description: true,
				full_name: true,
				phone: true,
				email: true,
				created_at: true,
				updated_at: true,
				target_id: true,
				LeadStatus: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})
		return leads
	}

	static async remove(leadId: number, userId: number) {
		const lead = await prisma.lead.findUnique({
			where: {
				id: leadId
			}
		})

		if (!lead) throw new Error('Lead not found')
		const lastPos = (await prisma.leadStatus.findMany())
			.sort((itemA, itemB) => itemA.position - itemB.position)
			.at(-1)!.position
		const leadArchivedStatus = await prisma.leadStatus.upsert({
			where: {
				name: 'Archived'
			},
			update: {},
			create: {
				name: 'Archived',
				position: lastPos + 1
			}
		})

		const archivedLead = await prisma.lead.update({
			where: {
				id: leadId
			},
			data: {
				status_id: leadArchivedStatus.id
			}
		})

		await prisma.leadArchive.create({
			data: {
				lead_id: lead.id,
				prev_status: lead.status_id,
				next_status: archivedLead.status_id,
			}
		})

		return archivedLead
	}

	static async updateStatus(leadId: number, statusId: number) {
		const lead = await prisma.lead.findUnique({
			where: {
				id: leadId
			}
		})

		if (!lead) throw createError('Lead not found', 404)

		const updatedLead = await prisma.lead.update({
			where: {
				id: leadId
			},
			data: {
				status_id: statusId
			}
		})

		await prisma.leadArchive.create({
			data: {
				lead_id: leadId,
				prev_status: lead?.status_id,
				next_status: updatedLead.status_id,
			}
		})

		return updatedLead
	}

	static async update(params: {
		lead: Partial<Omit<Lead, 'id'>>
		leadId: number
	}) {
		const { lead, leadId } = params
		const leadExists = await prisma.lead.findUnique({
			where: {
				id: leadId
			}
		})

		if (!leadExists) throw createError('Lead not found', 404)

		const updatedLead = await prisma.lead.update({
			where: {
				id: leadId
			},
			data: lead
		})

		return updatedLead
	}
}