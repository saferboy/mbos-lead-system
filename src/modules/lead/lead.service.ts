import { createError } from "../../core/utils/createError";
import { Lead } from "@prisma/client";

import { prisma } from "../prisma/prisma.service";
import { LeadBody } from "./lead.dto";

export default class LeadService {
  static async create(params: { leadData: LeadBody }) {
    const { leadData } = params;

    const lead = await prisma.lead.create({
      data: leadData,
    });

    return lead;
  }

  static async findById(leadId: number) {
    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });
    return lead;
  }

  static async getAll(
    status?: string,
    page?: number,
    limit?: number,
    startDay?: Date,
    endDay?: Date
  ) {
    const leads = prisma.lead.findMany({
      skip: page && (page - 1) * (limit ?? 0) + 1,
      take: limit,
      where: {
        created_at: {
          gte: startDay,
          lte: endDay,
        },
      },

      select: {
        id: true,
        title: true,
        description: true,
        full_name: true,
        phone: true,
        email: true,
        created_at: true,
        updated_at: true,
        target_id: true,
      },
    });
    return leads;
  }

  static async remove(leadId: number, userId: number) {
    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });

    if (!lead) throw new Error("Lead not found");

    const archivedLead = await prisma.lead.delete({
      where: {
        id: leadId,
      },
    });

    return archivedLead;
  }


  static async update(params: {
    lead: Partial<Omit<Lead, "id">>;
    leadId: number;
  }) {
    const { lead, leadId } = params;
    const leadExists = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });

    if (!leadExists) throw createError("Lead not found", 404);

    const updatedLead = await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: lead,
    });

    return updatedLead;
  }
}
