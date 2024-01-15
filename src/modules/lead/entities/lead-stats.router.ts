import express from 'express'

import { getLeadStats } from './lead-stats.controller'

const router = express.Router()


router.get('/', getLeadStats)

export default router
