// backend/src/modules/client/client.service.ts
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

const reorderClients = async (ids: string[]) => {
  const updates = ids.map((id, index) =>
    prisma.client.update({
      where: { id },
      data: { order: index + 1 },
    })
  );

  await prisma.$transaction(updates);
  return { success: true, message: "Order updated successfully" };
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
  await prisma.client.delete({
    where: { id },
  });

  return { message: "Client deleted successfully" };
};

export const clientService = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  reorderClients,
};