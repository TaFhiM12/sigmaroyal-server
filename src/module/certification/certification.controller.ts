import { Request, Response } from "express";
import { certificationService } from "./certification.service";

const createCertification = async (req: Request, res: Response) => {
  try {
    const result = await certificationService.createCertification(req.body);

    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to create certification",
    });
  }
};

const getAllCertifications = async (req: Request, res: Response) => {
  try {
    const result = await certificationService.getAllCertifications();

    res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch certifications",
    });
  }
};

const getCertificationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const certification = await certificationService.getCertificationById(id as string);

    res.status(200).json({
      success: true,
      message: "Certification fetched successfully",
      data: certification,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Certification not found") {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    console.error(`Error fetching certification with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch certification",
    });
  }
};

const updateCertification = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await certificationService.updateCertification(id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error(`Error updating certification with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to update certification",
    });
  }
};

const deleteCertification = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await certificationService.deleteCertification(id as string);

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error: unknown) {
    console.error(`Error deleting certification with id ${id}:`, error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to delete certification",
    });
  }
};

const reorderCertifications = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request: ids array required",
    });
  }

  try {
    const result = await certificationService.reorderCertifications(ids as string[]);

    res.status(200).json({
      ...result,
    });
  } catch (error: unknown) {
    console.error("Error reordering certifications:", error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to reorder certifications",
    });
  }
};

export const certificationController = {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
  reorderCertifications,
};