import Joi from 'joi'

export const leadArchiveCommentCreateUpdate = Joi.object<{ comment: string }>({
	comment: Joi.string().min(3).required()
})
