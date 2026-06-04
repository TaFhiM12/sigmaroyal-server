import { Router } from "express";
import { contactController } from "./contact.controller";

const router = Router();

router.post("/", contactController.sendMessage);

export const contactRoutes = router;
