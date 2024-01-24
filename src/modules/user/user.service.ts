import bcrypt from 'bcrypt'
import { createError } from '../../core'

import { Role } from '@prisma/client'

import { prisma } from '../prisma/prisma.service'
import { UserBody } from './user.dto'

export default class UserService {
	static async createUser(data: UserBody) {
		const hashPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
		const newUser = await prisma.user.create({
			data: {
				first_name: data.first_name,
				last_name: data.last_name,
				username: data.username,
				password: hashPassword,
				phone: data.phone,
				role: data.role
			}
		})
		return newUser
	}

	static async findUserName(username: string) {
		const find = await prisma.user.findUnique({
			where: {
				username
			}
		})
		return find
	}

	static async findUserById(id: number) {
		const find = await prisma.user.findUnique({
			where: {
				id
			}
		})
		return find
	}

	// static async deleteUser(id: number) {
	// 	const user = await prisma.user.update({
	// 		where: {
	// 			id
	// 		},
	// 		data: {
	// 			status: 'deleted'
	// 		}
	// 	})
	// 	return user
	// }

	static async forceDeleteUser(id: number) {
		const user = await prisma.user.delete({
			where: { id }
		})
		return user
	}

	static async update(id: number, data: Partial<Omit<UserBody, 'role'>>) {
		const hashedPassword =
			data.password && bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

		const isExists = await prisma.user.findUnique({
			where: { username: data.username }
		})

		if (isExists && data.username !== isExists.username)
			throw createError('User already exists', 400)

		const user = await prisma.user.update({
			where: {
				id
			},
			data: {
				first_name: data.first_name,
				last_name: data.last_name,
				username: data.username,
				password: hashedPassword,
				phone: data.phone
			}
		})
		return user
	}

	static async updateUserRole(id: number, role: Role) {
		const user = await prisma.user.update({
			where: {
				id
			},
			data: {
				role
			}
		})

		return user
	}
}