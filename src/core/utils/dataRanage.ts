export function isValid(date?: Date): boolean {
	if (date && isNaN(+date)) {
		return false
	}
	return true
}

export function parseDate(value?: string): Date | undefined {
	return value ? new Date(value) : undefined
}
