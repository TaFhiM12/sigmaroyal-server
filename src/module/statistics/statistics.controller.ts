import { Request, Response } from "express";
import { statisticsService } from "./statistics.service.js";

const getPublicStatistics = async (_req: Request, res: Response) => {
  try {
    const data = await statisticsService.getPublicStatistics();

    res.status(200).json({
      success: true,
      message: "Public statistics fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching public statistics:", error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch statistics",
    });
  }
};

export const statisticsController = {
  getPublicStatistics,
};
