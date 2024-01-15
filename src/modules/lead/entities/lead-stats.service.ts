import dayjs from "dayjs"

import { prisma } from '../../prisma/prisma.service'

export class LeadStatsService {
	static async getCounts() {
		const today = dayjs(new Date())
		const lastWeek = today.subtract(7, 'week')
		const lastMonth = today.subtract(1, 'month')

		const todayLead = await prisma.lead.count({
			where: {
				created_at: {
					gte: today.startOf('day').toDate(),
					lte: today.endOf('day').toDate()
				}
			}
		})

		const lastWeekLead = await prisma.lead.count({
			where: {
				created_at: {
					gte: lastWeek.startOf('day').toDate(),
					lte: today.endOf('day').toDate()
				}
			}
		})

		const lastMonthLead = await prisma.lead.count({
			where: {
				created_at: {
					gte: lastMonth.startOf('day').toDate(),
					lte: today.endOf('day').toDate()
				}
			}
		})

		return {
			today: todayLead,
			lastWeak: lastWeekLead,
			lastMonth: lastMonthLead
		}
	}
}
