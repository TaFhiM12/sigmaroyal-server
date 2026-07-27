import { Request, Response } from "express";
import { showcaseService } from "./showcase.service.js";

const sendError = (res: Response, error: unknown) =>
  res.status(400).json({
    success: false,
    message: error instanceof Error ? error.message : "Showcase request failed",
  });

const listPublic = async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, data: await showcaseService.listPublic() });
  } catch (error) {
    sendError(res, error);
  }
};

const listAdmin = async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, data: await showcaseService.listAdmin() });
  } catch (error) {
    sendError(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      success: true,
      message: "Showcase image created",
      data: await showcaseService.create(req.body),
    });
  } catch (error) {
    sendError(res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: "Showcase image updated",
      data: await showcaseService.update(String(req.params.id), req.body),
    });
  } catch (error) {
    sendError(res, error);
  }
};

const reorder = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: "Showcase reordered",
      data: await showcaseService.reorder(req.body.ids),
    });
  } catch (error) {
    sendError(res, error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await showcaseService.remove(String(req.params.id));
    res.json({ success: true, message: "Showcase image deleted" });
  } catch (error) {
    sendError(res, error);
  }
};

export const showcaseController = {
  listPublic,
  listAdmin,
  create,
  update,
  reorder,
  remove,
};
