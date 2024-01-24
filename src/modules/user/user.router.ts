import { Router } from "express";

import { permission } from "../../core/middleware/role-permission";

import { create, update } from "./user.controller";

const router = Router();

// router.get(
//   "/profile",
//   permission([
//     "admin",
//     "callcenter",
//     "manager",
//     "supervisor",
//     "user",
//     "marketer",
//   ]),
//   getProfile
// );

router.post("/", permission(["admin"]), create);

router.put("/:id", permission(["admin", "supervisor"]), update);

export default router;
