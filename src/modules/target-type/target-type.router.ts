import { Router } from "express";

import {
  create,
  getById,
  remove,
  getAll,
  update,
} from "./target-type.controller";

const router = Router();
router.post("/", create);
router.get("/:id", getById);
router.get("/", getAll);

router.put("/:id", update);
router.delete("/:id", remove);

export default router;
