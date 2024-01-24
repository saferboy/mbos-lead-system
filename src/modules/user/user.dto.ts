import { Role } from '@prisma/client'

export interface UserLogin {
	username: string
	password: string
}

export interface UserBody {
	first_name: string
	last_name: string
	username: string
	password: string
	phone: string
	role: Role
}
export interface UserDto {
	first_name: string
	last_name: string
	username: string
	password: string
	phone: string
}

export interface role {
	user: string
	admin: string
	callcenter: string
	manager: string
	marketer: string
}
