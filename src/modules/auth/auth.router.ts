import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import { LoginSchema } from '../auth/auth.schema'
import { login } from './auth.controller'

const validator = createValidator()

const router = Router()


router.post('/login', validator.body(LoginSchema), login)


export default router
