import { Router } from "express";

import { bodyValidate } from "../../core";

import {
  create,
  getById,
  remove,
  getAll,
  update,
} from "./target-link.controller";
import { permission } from "src/core/middleware/role-permission";

const router = Router();
router.post("/", permission(["marketer", "supervisor"]), create);
router.get("/:id", permission(["marketer", "supervisor"]), getById);
router.get("/", permission(["marketer", "supervisor"]), getAll);

router.put("/:id", permission(["marketer", "supervisor"]), update);
router.put("/:id", permission(["marketer", "supervisor"]), remove);

export default router;
