export interface Users {
	id: number
	first_name: string
	last_name: string
	username: string
	role: string
}

export interface Archive {
	id: number
	task_id: number
	result: string
	lead_id: number
	type: string
	comment: string | null
	prev_status: {
		id: number
		name: string
	}
	next_status: {
		id: number
		name: string
	} | null
	updated_at: string
}
