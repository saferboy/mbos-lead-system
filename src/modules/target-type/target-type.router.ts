import { Router } from "express";
import { permission } from "../../core/middleware/role-permission";
import {
  create,
  getById,
  remove,
  getAll,
  update,
} from "./target-type.controller";

const router = Router();
router.post("/", permission(["marketer", "supervisor"]), create);
router.get("/:id", permission(["marketer", "supervisor"]), getById);
router.get("/", permission(["marketer", "supervisor"]), getAll);

router.put("/:id", permission(["marketer", "supervisor"]), update);
router.delete("/:id", permission(["marketer", "supervisor"]), remove);

export default router;
