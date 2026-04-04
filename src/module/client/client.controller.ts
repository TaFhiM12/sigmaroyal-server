// backend/src/modules/client/client.controller.ts
import { Request, Response } from "express";
import { clientService } from "./client.service";

const createClient = async (req: Request, res: Response) => {
  try {
    const result = await clientService.createClient(req.body);

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to create client",
    });
  }
};

const getAllClients = async (req: Request, res: Response) => {
  try {
    const result = await clientService.getAllClients();

    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: result,
    });
  } catch (error: unknown) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      success: false,
      message: (error instanceof Error ? error.message : String(error)) || "Failed to fetch clients",
    });
  }
};

const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const client = await clientService.getClientById(id as string);
    res.status(200).json({
      success: true,
      message: "Client fetched successfully",
      data: client,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Client not found") {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch client",
    });
  }
};

const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await clientService.updateClient(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Client not found") {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update client",
    });
  }
};

const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await clientService.deleteClient(id as string);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Client not found") {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete client",
    });
  }
};

const reorderClients = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid request: ids array required",
    });
  }

  try {
    const result = await clientService.reorderClients(ids);
    res.status(200).json(result);
  } catch (error: unknown) {
    console.error('Reorder error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to reorder clients",
    });
  }
};

export const clientController = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  reorderClients,
};