import { prisma } from "../../lib/prisma.js";

interface ShowcasePayload {
  imageUrl?: string;
  title?: string;
  location?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}

const listPublic = () =>
  prisma.showcaseImage.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

const listAdmin = () =>
  prisma.showcaseImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

const create = (payload: ShowcasePayload) => {
  if (!payload.imageUrl?.trim() || !payload.title?.trim()) {
    throw new Error("Image URL and title are required");
  }

  return prisma.showcaseImage.create({
    data: {
      imageUrl: payload.imageUrl.trim(),
      title: payload.title.trim(),
      location: payload.location?.trim() || null,
      sortOrder: Number.isFinite(payload.sortOrder) ? Number(payload.sortOrder) : 0,
      isActive: payload.isActive ?? true,
    },
  });
};

const update = (id: string, payload: ShowcasePayload) =>
  prisma.showcaseImage.update({
    where: { id },
    data: {
      ...(payload.imageUrl !== undefined && { imageUrl: payload.imageUrl.trim() }),
      ...(payload.title !== undefined && { title: payload.title.trim() }),
      ...(payload.location !== undefined && {
        location: payload.location?.trim() || null,
      }),
      ...(payload.sortOrder !== undefined && {
        sortOrder: Number(payload.sortOrder),
      }),
      ...(payload.isActive !== undefined && { isActive: payload.isActive }),
    },
  });

const reorder = async (ids: string[]) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("An ordered image ID list is required");
  }

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.showcaseImage.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );

  return listAdmin();
};

const remove = (id: string) =>
  prisma.showcaseImage.delete({
    where: { id },
  });

export const showcaseService = {
  listPublic,
  listAdmin,
  create,
  update,
  reorder,
  remove,
};
