// backend project.routes.ts
import { Router } from "express";
import { projectController } from "./project.controller";

const router = Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/id/:id", projectController.getProjectById);  // Get by ID
router.get("/slug/:slug", projectController.getProjectBySlug);  // Get by slug
router.put("/:id", projectController.updateProject);  // Update by ID
router.delete("/:id", projectController.deleteProject);

export const projectRoutes = router;