// backend/src/modules/client/client.service.ts
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

interface CreateClientPayload {
  name: string;
  logoUrl: string;
  website: string;
  order?: number;
  isActive?: boolean;
}

interface UpdateClientPayload {
  name?: string;
  logoUrl?: string;
  website?: string;
  order?: number;
  isActive?: boolean;
}

const createClient = async (payload: CreateClientPayload) => {
  const { name, logoUrl, website, order, isActive } = payload;

  const maxOrder = await prisma.client.aggregate({
    _max: { order: true },
  });

  const result = await prisma.client.create({
    data: {
      name,
      logoUrl,
      website,
      order: order !== undefined ? order : (maxOrder._max.order ?? 0) + 1,
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  return result;
};

const getAllClients = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { order: 'asc' },
  });

  return clients;
};

const getClientById = async (id: string) => {
  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) {
    throw new Error("Client not found");
  }

  return client;
};

const updateClient = async (id: string, payload: UpdateClientPayload) => {
  // First check if client exists
  const existingClient = await prisma.client.findUnique({
    where: { id },
  });

  if (!existingClient) {
    throw new Error("Client not found");
  }

  const { name, logoUrl, website, order, isActive } = payload;

  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (logoUrl !== undefined) updateData.logoUrl = logoUrl;
  if (website !== undefined) updateData.website = website;
  if (order !== undefined) updateData.order = order;
  if (isActive !== undefined) updateData.isActive = isActive;

  const updated = await prisma.client.update({
    where: { id },
    data: updateData,
  });

  return updated;
};

const deleteClient = async (id: string) => {
  // First check if client exists
  const existingClient = await prisma.client.findUnique({
    where: { id },
  });

  if (!existingClient) {
    throw new Error("Client not found");
  }

  try {
    await prisma.client.delete({
      where: { id },
    });
    return { message: "Client deleted successfully" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new Error("Cannot delete client because it is referenced by other records");
      }
    }
    throw error;
  }
};

const reorderClients = async (ids: string[]) => {
  try {
    // Use a transaction to update all orders
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.client.update({
          where: { id },
          data: { order: index + 1 },
        })
      )
    );
    
    // Fetch and return the updated clients
    const updatedClients = await prisma.client.findMany({
      orderBy: { order: 'asc' },
    });
    
    return { 
      success: true, 
      message: "Order updated successfully",
      data: updatedClients 
    };
  } catch (error) {
    console.error('Reorder error:', error);
    throw new Error("Failed to reorder clients");
  }
};

export const clientService = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  reorderClients,
};