// import { RequestHandler } from "express";

// import LeadStatus from "../lead-status/lead-status.service";
// import LeadService from "../lead/lead.service";
// import { createError, targetLink } from "../../core";
// import TelegramBot from "node-telegram-bot-api"; // O'zgartiring

// // import { LeadBody } from '../lead/lead.dto'
// // import { prisma } from '../prisma/prisma.service'
// // import { Lead } from "@prisma/client";
// // Telegram botni tokenini quyidagi o'rniga yozing

// const botToken = "6748516425:AAF4Q6fgeTLTHSMtO2VZEInml_stL15azAY";
// const bot = new TelegramBot(botToken, { polling: true });

// export const create: RequestHandler = async (req, res, next) => {
//   try {
//     const body = req.body;
//     const url = targetLink.deserialize(req.url);
//     const status = (await LeadStatus.allStatus()).at(0);

//     if (!status || !url) throw createError("Bad request", 404);

//     const lead = await LeadService.create({
//       leadData: { ...body, target_id: +url.target_id, status_id: status.id },
//     });

//     const message = `Yangi lead yaratildi!\nID: ${lead.id}\nTitle: ${lead.title}\nDescription: ${lead.description}\nFull Name: ${lead.full_name}\nPhone: ${lead.phone}\nEmail: ${lead.email}`;
//     bot.sendMessage("YOUR_TELEGRAM_CHAT_ID", message); 

//     res.redirect("http://localhost:5173");
//   } catch (e) {
//     next(e);
//   }
// };
