interface GeneratedLinkParams {
	uid: string
	target_id: string
	payload: string
	lifetime: string
}

export const targetLink = {
	serialize(params: GeneratedLinkParams): string {
		const searchParams = new URLSearchParams(params as never) // 'as any' to handle TypeScript type-checking
		return `?${searchParams.toString()}`
	},
	deserialize(link: string): GeneratedLinkParams | null {
		const url = new URL(link, 'https://demo.practicum-academy.uz') // Dummy URL to support relative URLs

		const uid = url.searchParams.get('uid')
		const target_id = url.searchParams.get('target_id')
		const payload = url.searchParams.get('payload')
		const lifetime = url.searchParams.get('lifetime')

		if (uid && target_id && payload && lifetime) {
			return { uid, target_id, payload, lifetime }
		} else {
			return null
		}
	}
}
