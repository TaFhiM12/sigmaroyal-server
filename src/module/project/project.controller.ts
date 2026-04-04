// backend project.controller.ts
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
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch projects",
    });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await projectService.getProjectById(id as string);

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Project not found") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    console.error(`Error fetching project with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch project",
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await projectService.updateProject(id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error(`Error updating project with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to update project",
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await projectService.deleteProject(id as string);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: unknown) {
    console.error(`Error deleting project with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to delete project",
    });
  }
};

export const projectController = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};