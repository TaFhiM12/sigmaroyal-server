import { Request, Response } from "express";
import { hytorcService } from "./hytorc.service.js";

const getCategories = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === "true";
    const data = await hytorcService.getCategories(!includeInactive);

    return res.status(200).json({
      success: true,
      message: "HYTORC categories fetched successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch categories",
    });
  }
};

const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === "true";
    const slug = String(req.params.slug || "");

    if (!slug) {
      return res.status(400).json({ success: false, message: "Category slug is required" });
    }

    const data = await hytorcService.getCategoryBySlug(slug, !includeInactive);

    return res.status(200).json({
      success: true,
      message: "HYTORC category fetched successfully",
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch category";
    const status = message.includes("not found") ? 404 : 500;
    return res.status(status).json({ success: false, message });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const data = await hytorcService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      message: "HYTORC category created successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create category",
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "");
    const data = await hytorcService.updateCategory(id, req.body);
    return res.status(200).json({
      success: true,
      message: "HYTORC category updated successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update category",
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "");
    await hytorcService.deleteCategory(id);
    return res.status(200).json({
      success: true,
      message: "HYTORC category deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete category",
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = await hytorcService.createProduct(req.body);
    return res.status(201).json({
      success: true,
      message: "HYTORC product created successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create product",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "");
    const data = await hytorcService.updateProduct(id, req.body);
    return res.status(200).json({
      success: true,
      message: "HYTORC product updated successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update product",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "");
    await hytorcService.deleteProduct(id);
    return res.status(200).json({
      success: true,
      message: "HYTORC product deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete product",
    });
  }
};

const seedDefaults = async (_req: Request, res: Response) => {
  try {
    const result = await hytorcService.seedDefaults();

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to seed data",
    });
  }
};

export const hytorcController = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaults,
};
