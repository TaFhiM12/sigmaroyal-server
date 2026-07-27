import { Router } from "express";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";
import { showcaseController } from "./showcase.controller.js";

const router = Router();

router.get("/", showcaseController.listPublic);
router.get("/admin", requireAdminAuth, showcaseController.listAdmin);
router.post("/", requireAdminAuth, showcaseController.create);
router.put("/reorder", requireAdminAuth, showcaseController.reorder);
router.put("/:id", requireAdminAuth, showcaseController.update);
router.delete("/:id", requireAdminAuth, showcaseController.remove);

export const showcaseRoutes = router;
