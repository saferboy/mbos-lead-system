import { Router } from 'express'

import { bodyValidate } from '../../core'

import {
	addComment,
	getAll,
	getById,
	updateComment
} from './lead-archive.controller'
import { leadArchiveCommentCreateUpdate } from './lead-archive.model'

const router = Router()

router.get(
	'/:leadId',
	getAll
)

router.get(
	'/record/:id',
	getById
)


router.post(
	'/:id/comment',
	bodyValidate(leadArchiveCommentCreateUpdate),
	addComment
)


router.put(
	'/:id/comment',
	bodyValidate(leadArchiveCommentCreateUpdate),
	updateComment
)

export default router
