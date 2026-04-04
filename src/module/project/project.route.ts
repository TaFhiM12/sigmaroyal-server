// backend project.routes.ts
import { Router } from "express";
import { projectController } from "./project.controller";

const router = Router();

// All routes use ID
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);  // Get by ID
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export const projectRoutes = router;