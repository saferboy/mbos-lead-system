import { Router } from "express";

import { bodyValidate } from "../../core";

import { create, getAll, update } from "./target.controller";
import { targetCreateScheme, targetUpdateScheme } from "./target.model";
import { permission } from "src/core/middleware/role-permission";

const router = Router();

router.get("/", permission(["marketer", "supervisor"]), getAll);

router.post(
  "/",
  permission(["marketer", "supervisor"]),
  bodyValidate(targetCreateScheme),
  create
);

router.put(
  "/:id",
  permission(["marketer", "supervisor"]),
  bodyValidate(targetUpdateScheme),
  update
);

export default router;
