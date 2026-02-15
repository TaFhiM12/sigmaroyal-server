import express from 'express';
import { projectController } from './project.controller';
const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);
router.post('/create', projectController.createProject);

export const projectRoutes = router;
