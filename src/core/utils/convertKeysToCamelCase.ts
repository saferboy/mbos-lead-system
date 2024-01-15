/* eslint-disable @typescript-eslint/no-explicit-any */
import { CamelCase } from '../types'

export const convertKeysToCamelCase = <U>(
	obj: U
): CamelCase<U> | CamelCase<U>[] => {
	if (typeof obj !== 'object' || obj === null) {
		return obj as CamelCase<U>
	}

	if (Array.isArray(obj)) {
		return obj.map(item => convertKeysToCamelCase(item)) as CamelCase<U>[]
	}

	const newObj: { [key: string]: any } = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (key !== 'password') {
				const newKey = key.charAt(0).toLowerCase() + key.slice(1)
				newObj[newKey] =
					obj[key] instanceof Date
						? (obj[key] as Date).toISOString()
						: convertKeysToCamelCase(obj[key])
			}
		}
	}

	return newObj as CamelCase<U>
}
