import { prisma } from '../prisma/prisma.service'

export class LeadArchiveService {
	static async getAll(leadId: number) {
		const archive = await prisma.leadArchive.findMany({
			where: {
				lead_id: leadId
			},
			include: {
				Lead: true,
			}
		})

		return archive
	}

	static async get(archiveId: number) {
		const archive = await prisma.leadArchive.findUnique({
			where: {
				id: archiveId
			},
			select: {
				id: true,
				lead_id: true,
				comment: true,
				prev_status: true,
				next_status: true,
				updated_at: true
			}
		})

		if (!archive) {
			return null
		}

		return archive
	}

	static async addComment(archiveId: number, comment: string) {
		const archive = await prisma.leadArchive.update({
			where: {
				id: archiveId
			},
			data: {
				comment
			}
		})
		return archive
	}

	static async updateComment(archiveId: number, comment: string) {
		const archive = await prisma.leadArchive.update({
			where: {
				id: archiveId
			},
			data: {
				comment
			}
		})
		return archive
	}
}
