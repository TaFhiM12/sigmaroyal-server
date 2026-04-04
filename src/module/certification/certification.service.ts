import { prisma } from "../../lib/prisma";

interface CreateCertificationPayload {
  title: string;
  shortLabel: string;
  src: string;
  order?: number;
  isActive?: boolean;
}

interface UpdateCertificationPayload {
  title?: string;
  shortLabel?: string;
  src?: string;
  order?: number;
  isActive?: boolean;
}

const createCertification = async (payload: CreateCertificationPayload) => {
  const { title, shortLabel, src, order, isActive } = payload;

  // Get the highest order value to place new item at the end
  const maxOrder = await prisma.certificate.aggregate({
    _max: { order: true },
  });

  const result = await prisma.certificate.create({
    data: {
      title,
      shortLabel,
      src,
      order: order !== undefined ? order : (maxOrder._max.order || 0) + 1,
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  return result;
};

const getAllCertifications = async () => {
  const certifications = await prisma.certificate.findMany({
    orderBy: { order: 'asc' },
  });

  return certifications;
};

const getCertificationById = async (id: string) => {
  const certification = await prisma.certificate.findUnique({
    where: { id },
  });

  if (!certification) {
    throw new Error("Certification not found");
  }

  return certification;
};

const updateCertification = async (id: string, payload: UpdateCertificationPayload) => {
  const { title, shortLabel, src, order, isActive } = payload;

  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (shortLabel !== undefined) updateData.shortLabel = shortLabel;
  if (src !== undefined) updateData.src = src;
  if (order !== undefined) updateData.order = order;
  if (isActive !== undefined) updateData.isActive = isActive;

  const updated = await prisma.certificate.update({
    where: { id },
    data: updateData,
  });

  return updated;
};

const deleteCertification = async (id: string) => {
  await prisma.certificate.delete({
    where: { id },
  });

  return { message: "Certification deleted successfully" };
};

const reorderCertifications = async (ids: string[]) => {
  const updates = ids.map((id, index) =>
    prisma.certificate.update({
      where: { id },
      data: { order: index + 1 },
    })
  );

  await prisma.$transaction(updates);
  return { success: true, message: "Order updated successfully" };
};

export const certificationService = {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
  reorderCertifications,
};