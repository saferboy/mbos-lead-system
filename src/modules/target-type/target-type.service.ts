import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TargetTypeService {
  // Create
  static async create(name: string, description?: string) {
    const type = prisma.targetType.create({
      data: {
        name,
        description,
      },
    });
    return type;
  }

  // Read
  static async getAll() {
    const type = prisma.targetType.findMany();
    return type;
  }

  static async findById(id: number) {
    const type = prisma.targetType.findUnique({
      where: {
        id,
      },
    });
    return type;
  }

  // Update
  static async update(id: number, name: string, description?: string) {
    const type = prisma.targetType.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return type;
  }

  // Delete
  static async remove(id: number) {
    const type = prisma.targetType.delete({
      where: {
        id,
      },
    });
    return type;
  }
}
