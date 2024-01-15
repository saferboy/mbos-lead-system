import { createError } from '../../core'
import { prisma } from '../prisma/prisma.service'

export default class LeadStatus {
	static async createStatus(name: string) {
		const allStatus = await prisma.leadStatus.findMany({
			orderBy: {
				position: 'asc'
			}
		})

		const lastElement = allStatus.at(-1)
		const lastPosition = lastElement ? lastElement.position + 1 : 1

		const status = prisma.leadStatus.create({
			data: {
				name,
				position: lastPosition
			}
		})
		return status
	}

	static async allStatus(page?: number, limit?: number) {
		const status = prisma.leadStatus.findMany({
			skip: page && (page - 1) * (limit ?? 0) + 1,
			take: limit
		})
		return status
	}

	static async findStatusByName(name: string) {
		const status = await prisma.leadStatus.findUnique({
			where: {
				name
			}
		})
		return status
	}

	static async findStatusById(id: number) {
		const status = prisma.leadStatus.findUnique({
			where: {
				id
			}
		})
		return status
	}

	static async updateStatus(id: number, name: string) {
		const status = prisma.leadStatus.update({
			where: {
				id
			},
			data: {
				name
			}
		})
		return status
	}

	static async deleteStatus(id: number) {
		const status = prisma.leadStatus.delete({
			where: {
				id
			}
		})
		return status
	}

	static async getAllWithStatus(startDay?: Date, endDay?: Date) {
		const status = await prisma.leadStatus.findMany({
			select: {
				id: true,
				name: true,
				position: true,
				lead: {
					include: {
						LeadStatus: true
					},
					where: {
						created_at: {
							gte: startDay,
							lte: endDay
						}
					}
				}
			}
		})
		return status
	}

	static async updatePosition(statusId: number, newPosition: number) {
		const status = await this.findStatusById(statusId)

		if (!status) throw createError('Status not found', 404)

		const updatedStatus = await prisma.leadStatus.update({
			where: {
				id: statusId
			},
			data: {
				position: newPosition
			}
		})

		const allStatus = await prisma.leadStatus.findMany({
			orderBy: {
				position: 'asc'
			}
		})

		for (let index = 0; index < allStatus.length; index++) {
			const item = allStatus[index]

			if (item.position !== newPosition) {
				continue
			}

			if (item.id === statusId) {
				continue
			}

			if (item.position > status.position && item.position <= newPosition) {
				await prisma.leadStatus.update({
					where: {
						id: item.id
					},
					data: {
						position: item.position - 1
					}
				})
			} else if (
				item.position < status.position &&
				item.position >= newPosition
			) {
				await prisma.leadStatus.update({
					where: {
						id: item.id
					},
					data: {
						position: item.position + 1
					}
				})
			}
		}
		return updatedStatus
	}
}
