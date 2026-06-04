import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.login({ email, password });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    return res.status(401).json({
      success: false,
      message,
    });
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const payload = authService.verifyToken(token);

    return res.status(200).json({
      success: true,
      message: "Token valid",
      data: payload,
    });
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const authController = {
  login,
  verify,
};
