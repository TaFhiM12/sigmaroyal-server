import { Router } from "express";
import { hytorcController } from "./hytorc.controller.js";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";

const router = Router();

router.get("/categories", hytorcController.getCategories);
router.get("/categories/:slug", hytorcController.getCategoryBySlug);

router.post("/categories", requireAdminAuth, hytorcController.createCategory);
router.put("/categories/:id", requireAdminAuth, hytorcController.updateCategory);
router.delete("/categories/:id", requireAdminAuth, hytorcController.deleteCategory);

router.post("/products", requireAdminAuth, hytorcController.createProduct);
router.put("/products/:id", requireAdminAuth, hytorcController.updateProduct);
router.delete("/products/:id", requireAdminAuth, hytorcController.deleteProduct);

router.post("/seed-default", requireAdminAuth, hytorcController.seedDefaults);

export const hytorcRoutes = router;
