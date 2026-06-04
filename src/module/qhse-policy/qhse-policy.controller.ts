import { Request, Response } from "express";
import { qhsePolicyService } from "./qhse-policy.service";

const getPolicy = async (_req: Request, res: Response) => {
  try {
    const data = await qhsePolicyService.getPolicy();

    return res.status(200).json({
      success: true,
      message: "QHSE policy fetched successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch QHSE policy",
    });
  }
};

const updatePolicy = async (req: Request, res: Response) => {
  try {
    const data = await qhsePolicyService.updatePolicy(req.body);

    return res.status(200).json({
      success: true,
      message: "QHSE policy updated successfully",
      data,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update QHSE policy",
    });
  }
};


const seedDefaultPolicy = async (_req: Request, res: Response) => {
  try {
    const result = await qhsePolicyService.seedDefaultPolicy();
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
      inserted: result.inserted,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to seed QHSE policy",
    });
  }
};

const deleteDefaultPolicy = async (_req: Request, res: Response) => {
  try {
    const result = await qhsePolicyService.deleteDefaultPolicy();
    return res.status(200).json({
      success: true,
      message: result.message,
      count: result.count,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete QHSE policy",
    });
  }
};

export const qhsePolicyController = {
  getPolicy,
  updatePolicy,
  seedDefaultPolicy,
  deleteDefaultPolicy,
};
