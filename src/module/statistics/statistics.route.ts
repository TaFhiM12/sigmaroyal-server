import { Router } from "express";
import { statisticsController } from "./statistics.controller.js";

const router = Router();

router.get("/", statisticsController.getPublicStatistics);

export const statisticsRoutes = router;
