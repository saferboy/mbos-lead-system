import Joi from "joi";

import { Lead } from "@prisma/client";

import { LeadBody } from "./lead.dto";

export const leadCreateScheme = Joi.object<LeadBody>({
  select: Joi.any(),
  full_name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
});

export const crateLeadResponse = Joi.object({
  id: Joi.number().min(1),
  title: Joi.string().min(1),
  description: Joi.string().description,
  full_name: Joi.string().min(1),
  phone: Joi.string().min(1),
  mail: Joi.string().email(),
  price: Joi.string().min(1),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  target_id: Joi.number().min(1),
  status_id: Joi.number().min(1),
  type_id: Joi.number().min(1),
});

export const leadUpdateStatusScheme = Joi.object({
  status_id: Joi.number().required(),
});

export const leadUpdateScheme = Joi.object<Omit<Lead, "id">>({
  title: Joi.string().min(3).optional(),
  description: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  full_name: Joi.string().min(2).optional(),
  phone: Joi.string().optional(),
});
