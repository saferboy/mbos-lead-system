import { RequestHandler } from "express";

import { createError, isValid, parseDate, targetLink } from "../../core";
import { Lead } from "@prisma/client";

import LeadService from "./lead.service";
import TelegramBot from "node-telegram-bot-api";
import { LeadBody } from "./lead.dto";
import { error } from "console";
import path from "path";

const botToken = "6748516425:AAF4Q6fgeTLTHSMtO2VZEInml_stL15azAY";
const bot = new TelegramBot(botToken, { polling: true });

export const create: RequestHandler = async (req, res, next) => {
  try {
    const body: LeadBody = req.body;
    const url = targetLink.deserialize(req.url);
    console.log(url, body);
    if (!url) throw createError("Bad request", 404);

    const lead = await LeadService.create({
      leadData: { ...body, target_id: +url.target_id },
    });

    const chatId = 6317986035;
    const message = `Yangi lead yaratildi!\nID: ${lead.id}\nTitle: ${lead.title}\nDescription: ${lead.description}\nFull Name: ${lead.full_name}\nPhone: ${lead.phone}\nEmail: ${lead.email}`;
    console.log(message)
    bot.sendMessage(chatId, message);

    res.redirect(path.join(__dirname, "send", "/index.html"));
  } catch (e) {
    console.log(e);
    res.send(error);
  }
};



export const remove: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const user = res.locals.user;

  try {
    const lead = await LeadService.remove(+id, user.id);
    res.send({
      message: "Lead Archived",
      lead,
    });
  } catch (e) {
    next(e);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const status = req.query.status as string | undefined;

    const { startDay, endDay } = req.query as {
      startDay?: string;
      endDay?: string;
    };

    const page = req.query.page ? +req.query.page : undefined;
    const limit = req.query.limit ? +req.query.limit : undefined;

    if (startDay && endDay) {
      const fromDate = parseDate(startDay); // undefined > parse > undefined
      const toDate = parseDate(endDay); // undefined > parse > undefined

      if (!isValid(fromDate) || !isValid(toDate)) {
        return res.status(400).json({
          message: "please enter the correct date",
        });
      }

      const incDate = new Date(endDay);
      incDate.setDate(incDate.getDate() + 1);

      const mapped = await LeadService.getAll(
        status,
        page,
        limit,
        fromDate,
        incDate
      );

      const leads = mapped.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          full_name: item.full_name,
          phone: item.phone,
          email: item.email,
          created_at: item.created_at,
          updated_at: item.updated_at,
          target_id: item.target_id,
        };
      });

      res.send({
        message: "All Leads",
        leads,
      });
    }
    const mapped = await LeadService.getAll(status, page, limit);

    const leads = mapped.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        full_name: item.full_name,
        phone: item.phone,
        email: item.email,
        created_at: item.created_at,
        updated_at: item.updated_at,
        target_id: item.target_id,
      };
    });
    res.send({
      message: "All Leads",
      leads,
    });
  } catch (e) {
    next(e);
  }
};

export const findById: RequestHandler = async (req, res, next) => {
  try {
    const leadId = +req.params.id;

    const lead = await LeadService.findById(leadId);

    if (!lead) throw createError("Lead not found", 404);

    return res.status(200).json({
      message: "Retrive lead",
      lead,
    });
  } catch (e) {
    next(e);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const body = req.body as Omit<Lead, "id">;
    const lead = await LeadService.update({ leadId: id, lead: body });

    return res.status(200).json({
      message: "Updated lead",
      lead,
    });
  } catch (e) {
    next(e);
  }
};
