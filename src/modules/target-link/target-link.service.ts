import {randomUUID} from 'node:crypto'
import { PrismaClient } from "@prisma/client";
import { TargetLinkBody, TargetLinkUpdateBody } from "./target-link.model";
import {TargetService} from '../target/target.service'
import { TargetTypeService } from '../target-type/target-type.service'
import {targetLink} from '../../core'
const prisma = new PrismaClient();

export class TargetLinkService {
  // Create
  static async create(
    data: TargetLinkBody
  ) {
    const uid = randomUUID()
    const targetId = (await TargetService.findById(data.target_id))?.id
    const targetTypeId = (await TargetTypeService.findById(data.type_id))?.id

    const link = targetLink.serialize({
      uid,
      target_id: `${targetId}`,
      type_id: `${targetTypeId}`,
    })
    const frontendUrl = process.env.FRONTEND_URL
    const target = prisma.targetLink.create({
      data: {
        type_id: data.type_id,
        target_id: data.target_id,
        link: `${frontendUrl}${link}`,
        payload: data.payload,
      },
    });
    return target;
  }

  // Read
  static async getAll() {
    const target = prisma.targetLink.findMany();
    return target;
  }

  static async findById(id: number) {
    const target = prisma.targetLink.findUnique({
      where: {
        id,
      },
    });
    return target;
  }

  // Update
  static async update(id: number, data: TargetLinkUpdateBody) {
    const target = prisma.targetLink.update({
      where: {
        id,
      },
      data: {
        // link: data.link,
        payload: data.payload,
      },
    });
    return target;
  }

  // Delete
  static async remove(id: number) {
    const target = prisma.targetLink.delete({
      where: {
        id,
      },
    });
    return target;
  }

  // Additional Read Operations
  static async getTargetLinksByTypeId(typeId: number) {
    const target = prisma.targetLink.findMany({
      where: {
        type_id: typeId,
      },
    });
    return target;
  }

  getTargetLinksByTargetId = async (targetId: number) => {
    return prisma.targetLink.findMany({
      where: {
        target_id: targetId,
      },
    });
  };
}
