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
import { permission } from "../../core/middleware/role-permission";

const router = Router();

router.use(
  "/lead-stats",
  permission(["marketer", "supervisor"]),
  leadStatsRouter
);

router.post("/", permission(["marketer", "supervisor"]), create);

router.delete("/:id", permission(["marketer", "supervisor"]), remove);

router.get("/", permission(["marketer", "supervisor"]), getAll);

router.get("/:id", permission(["marketer", "supervisor"]), findById);

router.put(
  "/:id",
  permission(["marketer", "supervisor"]),
  bodyValidate(leadUpdateScheme),
  update
);

export default router;
