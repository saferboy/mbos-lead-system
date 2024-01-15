import { Router } from "express";

import { bodyValidate } from "../../core";

import {
  allStatus,
  createStatus,
  findStatusId,
  getAllWithLeads,
  removeStatus,
  updatePosition,
  updateStatus,
} from "./lead-status.controller";
import { leadStatusCreateScheme } from "./lead-status.schema";

const router = Router();

router.use("/board", getAllWithLeads);

router.post("/", bodyValidate(leadStatusCreateScheme), createStatus);

router.get("/", allStatus);

router.get("/:id", findStatusId);

router.put("/:id", bodyValidate(leadStatusCreateScheme), updateStatus);

router.delete("/:id", removeStatus);
router.put("/:id/position", updatePosition);

export default router;
