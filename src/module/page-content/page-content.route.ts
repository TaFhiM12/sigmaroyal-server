import { Router } from "express";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";
import { pageContentController } from "./page-content.controller.js";

const router = Router();

router.get("/", requireAdminAuth, pageContentController.listPageContents);
router.post("/seed-defaults", requireAdminAuth, pageContentController.seedDefaultPageContents);
router.get("/admin/:slug", requireAdminAuth, pageContentController.getAdminPageContent);
router.get("/:slug", pageContentController.getPublicPageContent);
router.put("/:slug", requireAdminAuth, pageContentController.upsertPageContent);

export const pageContentRoutes = router;
