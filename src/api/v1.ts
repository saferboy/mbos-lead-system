import { Router } from 'express'

import {
	leadArchiveRouter,
	leadRouter,
	leadStatusRouter,
	targetRouter,
} from '../modules'

const router = Router()


router.use('/lead-status', leadStatusRouter)
router.use('/lead', leadRouter)
router.use('/target', targetRouter)
router.use('/lead-archive', leadArchiveRouter)


export default router
