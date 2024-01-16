import { Target, TargetStatus } from '@prisma/client'

import { prisma } from '../prisma/prisma.service'
import { createError, targetLink } from '../../core'
import { randomUUID } from 'crypto'

export class TargetService {
	static async create(name: string, description?: string, lifeTime?: Date, ) {
		const target = prisma.target.upsert({
			where: {
				name
			},
			update: {},
			create: {
				name,
				description,
				lifetime: lifeTime
			}
		})
		return target
	}

	static async update(
		targetId: number,
		targetData: Omit<Partial<Target>, 'id'> 
	) {
		const isExists = prisma.target.findUnique({
			where: {
				id: targetId
			}
		})

		if (!isExists) throw new Error('Target not found')

		const target = prisma.target.update({
			where: {
				id: targetId
			},
			data: targetData
		})

		return target
	}

	static async getAll(status?: TargetStatus) {
		const targets = prisma.target.findMany({
			where: {
				status
			}
		})

		return targets
	}

	static async findById(id: number) {
		const target = await prisma.target.findUnique({
			where: {
				id
			}
		})
		return target
	}
}
