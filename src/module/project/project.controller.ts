import { Request, Response } from "express";
import { projectService } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const result = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to create project",
    });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjects(req.query);

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      ...result,
    });
  } catch (error: unknown) {
    console.error("Error fetching projects:", error);

    res.status(500).json({
      success: false,
      message:
        (error instanceof Error ? error.message : String(error)) ||
        "Failed to fetch projects",
    });
  }
};


const getProjectBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const project = await projectService.getProjectBySlug(slug as string);

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error: unknown) {
    console.error(`Error fetching project with slug ${slug}:`, error);

    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch project",
    });
  }
};

export const projectController = {
  createProject,
  getProjects,
    getProjectBySlug,
};
