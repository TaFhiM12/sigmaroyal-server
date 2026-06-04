import { NextFunction, Request, Response } from "express";
import { authService } from "../module/auth/auth.service";

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: token missing",
      });
    }

    const payload = authService.verifyToken(token);

    if (payload.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: admin access required",
      });
    }

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid token",
    });
  }
};
