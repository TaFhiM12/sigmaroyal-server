import { Request, Response } from "express";
import { contactService } from "./contact.service";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const result = await contactService.sendContactMessage(req.body);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send message";
    const statusCode = message.includes("required") || message.includes("valid")
      ? 400
      : 500;

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const contactController = {
  sendMessage,
};
