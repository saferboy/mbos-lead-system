import { RequestHandler } from 'express'

import { LeadStatsService } from './lead-stats.service'

export const getLeadStats: RequestHandler = async (req, res, next) => {
	try {
		const leadStats = await LeadStatsService.getCounts()
		res.status(200).json(leadStats)
	} catch (error) {
		next(error)
	}
}
