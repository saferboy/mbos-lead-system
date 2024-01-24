import { NextFunction, Request, Response } from 'express'

import bcrypt from 'bcrypt'

// import { signAccessToken, signRefreshToken, verify } from '../../core'
import { sign } from '../../core/service/jwt/jwt.service';
import { Payload } from '../../core/payload.dto';
import { LoginDto } from './login.dto';

import UserService from '../user/user.service'

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const login: LoginDto = req.body
		const user = await UserService.findUserName(login.username)

		if (!user) {
			return res.status(401).send({ message: 'Username or password wrong!' })
		}

		const isPasswordValid = await bcrypt.compare(login.password, user.password)

		if (!isPasswordValid) {
			return res.status(401).send({
				message: 'Invalid password'
			})
		}

		const payload: Payload = {
            userId: user.id,
			role: user.role
        };
		const Token = await sign(payload) // 4h

		return res.send({
			message: 'Successfully login',
			user: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				phone: user.phone,
			},
			Token
		})
	} catch (err) {
		next(err)
	}
}


