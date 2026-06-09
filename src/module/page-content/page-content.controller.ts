import { Request, Response } from "express";
import { pageContentService } from "./page-content.service.js";

const listPageContents = async (_req: Request, res: Response) => {
  try {
    const data = await pageContentService.listPageContents();
    return res.status(200).json({
      success: true,
      message: "Page contents fetched successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch page contents",
    });
  }
};

const getPublicPageContent = async (req: Request, res: Response) => {
  try {
    const data = await pageContentService.getPublicPageContent(req.params.slug as string);
    return res.status(200).json({
      success: true,
      message: data ? "Page content fetched successfully" : "Page content not found",
      data,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch page content",
    });
  }
};

const getAdminPageContent = async (req: Request, res: Response) => {
  try {
    const data = await pageContentService.getAdminPageContent(req.params.slug as string);
    return res.status(200).json({
      success: true,
      message: "Page content fetched successfully",
      data,
    });
  } catch (error: unknown) {
    const isNotFound = error instanceof Error && error.message === "Page content not found";
    return res.status(isNotFound ? 404 : 500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch page content",
    });
  }
};

const upsertPageContent = async (req: Request, res: Response) => {
  try {
    const data = await pageContentService.upsertPageContent(req.params.slug as string, req.body);
    return res.status(200).json({
      success: true,
      message: "Page content saved successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to save page content",
    });
  }
};

const seedDefaultPageContents = async (_req: Request, res: Response) => {
  try {
    const result = await pageContentService.seedDefaultPageContents();
    return res.status(200).json({
      success: true,
      message: "Default page content records are ready",
      ...result,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to seed page contents",
    });
  }
};

export const pageContentController = {
  listPageContents,
  getPublicPageContent,
  getAdminPageContent,
  upsertPageContent,
  seedDefaultPageContents,
};
