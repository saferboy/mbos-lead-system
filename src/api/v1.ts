import { Router } from "express";

import {
  leadRouter,
  targetRouter,
  targetLinkRouter,
  targetTypeRouter,
  authRouter
} from "../modules";

const router = Router();
router.use("/auth", authRouter)
router.use("/lead", leadRouter);
router.use("/target", targetRouter);
router.use("/target-link", targetLinkRouter);
router.use("/target-type", targetTypeRouter);

export default router;
