// {
//   "message": "Archive retrived"
//   "archive" : {
//       "id": 1,
//       "User": {
//         "id": 2,
//         "first_name": "call",
//         "last_name": "call",
//         "username": "call",
//         "role": "callcenter"
//       },
//       "task_id": 1,
//       "result": "pending",
//       "lead_id": 1,
//       "type": "lead",
//       "comment": null,
//       "prev_status": {
//         "id": 1,
//         "name": "aonlinw"
//       },
//       "next_status": {
//         "id": 1,
//         "name": "aonlinw"
//       },
//       "updated_at": "2023-11-03T06:51:54.778Z"
//     },
// }

// new version 2 start

// static async getAll(leadId: number) {
// 	const archive = await prisma.leadArchive.findMany({
// 		where: {
// 			lead_id: leadId
// 		},
// 		select: {
// 			id: true,
// 			User: {
// 				select: {
// 					id: true,
// 					first_name: true,
// 					last_name: true,
// 					username: true,
// 					role: true
// 				}
// 			},
// 			task_id: true,
// 			result: true,
// 			lead_id: true,
// 			type: true,
// 			comment: true,
// 			prev_status: true,
// 			next_status: true,
// 			updated_at: true
// 		}
// 	})

// 	// const promise = await Promise.all(
// 	// 	archive.map(async archiveItem => {
// 	// 		return this.processArchiveItem(archiveItem)
// 	// 	})
// 	// )

// 	// return promise
// }

// static async processArchiveItem(archiveItem: ArchiveItem) {
// 	if (archiveItem.type === 'lead') {
// 		return {
// 			...archiveItem,
// 			prev_status: await this.getStatus(
// 				archiveItem.prev_status,
// 				'leadStatus'
// 			),
// 			next_status:
// 				archiveItem.next_status &&
// 				(await this.getStatus(archiveItem.next_status, 'leadStatus'))
// 		}
// 	}
// 	if (archiveItem.type === 'task') {
// 		return {
// 			...archiveItem,
// 			prev_status: await this.getStatus(
// 				archiveItem.prev_status,
// 				'leadTaskStatus'
// 			),
// 			next_status:
// 				archiveItem.next_status &&
// 				(await this.getStatus(archiveItem.next_status, 'leadTaskStatus'))
// 		}
// 	}
// 	return {}
// }

// static async getStatus(
// 	statusId: number,
// 	tableName: 'leadStatus' | 'leadTaskStatus'
// ) {
// 	const status =
// 		tableName === 'leadStatus'
// 			? await prisma.leadStatus.findUnique({
// 					where: {
// 						id: statusId
// 					}
// 			  })
// 			: await prisma.leadTaskStatus.findUnique({
// 					where: {
// 						id: statusId
// 					}
// 			  })
// 	return status
// }
// new version 2 end
