// backend project.routes.ts
import { Router } from "express";
import { projectController } from "./project.controller.js";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";

const router = Router();

// All routes use ID
router.post("/", requireAdminAuth, projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);  // Get by ID
router.put("/:id", requireAdminAuth, projectController.updateProject);
router.delete("/:id", requireAdminAuth, projectController.deleteProject);

export const projectRoutes = router;