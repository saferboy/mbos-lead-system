interface GeneratedLinkParams {
	uid: string
	target_id: string
	type_id: string
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
		const type_id = url.searchParams.get('type_id')

		if (uid && target_id && type_id) {
			return { uid, target_id, type_id}
		} else {
			return null
		}
	}
}
