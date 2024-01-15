import { NextFunction, Request, Response } from 'express'

declare type ExpressHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined> | Promise<void>

declare type WithOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>

declare type CamelCase<T> = T extends any[]
	? CamelCaseArray<T[number]>[]
	: T extends object
	  ? {
				[K in keyof T as Uncapitalize<string & K>]: K extends 'password'
					? never
					: T[K] extends Date
					  ? string
					  : T[K] extends object
					    ? CamelCase<T[K]>
					    : T[K]
	    }
	  : T

declare type CamelCaseArray<T> = T extends any[] ? CamelCase<T> : T
