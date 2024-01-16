import { Router } from "express";

import { bodyValidate } from "../../core";

import {
  create,
  getById,
  remove,
  getAll,
  update,
} from "./target-link.controller";

const router = Router();
router.post("/", create);
router.get("/:id", getById);
router.get("/", getAll);

router.put("/:id", update);
router.put("/:id", remove);

export default router;
