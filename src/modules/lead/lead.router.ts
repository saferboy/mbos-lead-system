import { Router } from "express";

// import { bodyValidate, permission } from '../../core'
import { bodyValidate } from "../../core";

import leadStatsRouter from "./entities/lead-stats.router";
import { create, findById, getAll, remove, update } from "./lead.controller";
import {
  leadCreateScheme,
  leadUpdateScheme,
  leadUpdateStatusScheme,
} from "./lead.schema";

const router = Router();

router.use("/lead-stats", leadStatsRouter);

router.post("/",  create);

router.delete("/:id", remove);

router.get("/", getAll);

router.get("/:id", findById);

router.put("/:id", bodyValidate(leadUpdateScheme), update);

export default router;
