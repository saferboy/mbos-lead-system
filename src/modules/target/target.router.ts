import { Router } from "express";

import { bodyValidate } from "../../core";

import { create, generateLink, getAll, update } from "./target.controller";
import { targetCreateScheme, targetUpdateScheme } from "./target.model";

const router = Router();

router.get("/", getAll);

router.post("/", bodyValidate(targetCreateScheme), create);
router.post("/:id", generateLink);

router.put("/:id", bodyValidate(targetUpdateScheme), update);

export default router;
