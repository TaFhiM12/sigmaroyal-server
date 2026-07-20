// backend project.service.ts - Fixed version without isMain/order
import { Prisma, Project, ProjectStatus, Sector } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";

type CreateProjectPayload = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  images?: Array<{ url: string; caption?: string }>;
};

const normalizeProjectStatus = (status?: string) => {
  if (!status) return undefined;

  const normalizedStatus = status.toUpperCase();
  return Object.values(ProjectStatus).includes(normalizedStatus as ProjectStatus)
    ? normalizedStatus as ProjectStatus
    : undefined;
};

const createProject = async (payload: CreateProjectPayload) => {
  const {
    title,
    slug,
    sector,
    client,
    companyRole,
    location,
    capacity,
    duration,
    year,
    scopeOfWork,
    description,
    status,
    featured,
    images,
  } = payload;

  const result = await prisma.project.create({
    data: {
      title,
      slug,
      sector,
      client,
      companyRole,
      location,
      capacity,
      duration,
      year,
      scopeOfWork,
      description,
      status: normalizeProjectStatus(status) || ProjectStatus.COMPLETED,
      featured,
      ...(images && images.length > 0 && {
        images: {
          create: images.map((img) => ({
            url: img.url,
            caption: img.caption || null,
          })),
        },
      }),
    },
    include: {
      images: true,
    },
  });

  return result;
};

const updateProject = async (id: string, payload: any) => {
  const {
    title,
    slug,
    sector,
    client,
    companyRole,
    location,
    capacity,
    duration,
    year,
    scopeOfWork,
    description,
    status,
    featured,
    images,
    existingImageIds,
    deleteImageIds,
  } = payload;

  // Update project basic info
  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (slug !== undefined) updateData.slug = slug;
  if (sector !== undefined) updateData.sector = sector;
  if (client !== undefined) updateData.client = client;
  if (companyRole !== undefined) updateData.companyRole = companyRole;
  if (location !== undefined) updateData.location = location;
  if (capacity !== undefined) updateData.capacity = capacity;
  if (duration !== undefined) updateData.duration = duration;
  if (year !== undefined) updateData.year = year;
  if (scopeOfWork !== undefined) updateData.scopeOfWork = scopeOfWork;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) {
    const normalizedStatus = normalizeProjectStatus(status);
    if (normalizedStatus) updateData.status = normalizedStatus;
  }
  if (featured !== undefined) updateData.featured = featured;

  await prisma.project.update({
    where: { id },
    data: updateData,
  });

  // Delete specific images by IDs
  if (deleteImageIds && deleteImageIds.length > 0) {
    await prisma.projectImage.deleteMany({
      where: {
        id: { in: deleteImageIds },
      },
    });
  }

  // Delete images not in keep list (if keep list provided)
  if (existingImageIds) {
    await prisma.projectImage.deleteMany({
      where: {
        projectId: id,
        id: { notIn: existingImageIds },
      },
    });
  }

  // Add new images
  if (images && images.length > 0) {
    await prisma.projectImage.createMany({
      data: images.map((img: any) => ({
        url: img.url,
        caption: img.caption || null,
        projectId: id,
      })),
    });
  }

  // Return updated project with images
  return prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });
};

interface ProjectQuery {
  page?: string;
  limit?: string;
  sector?: string;
  status?: string;
  featured?: string;
  year?: string;
  client?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

const getProjects = async (query: ProjectQuery) => {
  const {
    page = "1",
    limit = "10",
    sector,
    status,
    featured,
    year,
    client,
    search,
    sortBy = "updatedAt",
    sortOrder = "desc",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const where: Prisma.ProjectWhereInput = {};

  if (sector && Object.values(Sector).includes(sector as Sector)) {
    where.sector = sector as Sector;
  }

  const normalizedStatus = normalizeProjectStatus(status);
  if (normalizedStatus) {
    where.status = normalizedStatus;
  }

  if (featured !== undefined) {
    where.featured = featured === "true";
  }

  if (year) {
    where.year = Number(year);
  }

  if (client) {
    where.client = {
      contains: client,
      mode: "insensitive",
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
    ];
  }

  const validSortFields = [
    "createdAt",
    "updatedAt",
    "year",
    "title",
    "client",
  ];

  const orderBy: Prisma.ProjectOrderByWithRelationInput =
    validSortFields.includes(sortBy)
      ? {
          [sortBy]: sortOrder === "asc" ? "asc" : "desc",
        }
      : { updatedAt: "desc" };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { images: true },
      skip,
      take: limitNumber,
      orderBy,
    }),

    prisma.project.count({ where }),
  ]);

  const [completedCount, ongoingCount, upcomingCount, sectorCounts] =
    await Promise.all([
      prisma.project.count({
        where: { status: "COMPLETED" },
      }),

      prisma.project.count({
        where: { status: "ONGOING" },
      }),

      prisma.project.count({
        where: { status: "UPCOMING" },
      }),

      prisma.project.groupBy({
        by: ["sector"],
        _count: {
          sector: true,
        },
      }),
    ]);

  return {
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
    counts: {
      completed: completedCount,
      ongoing: ongoingCount,
      upcoming: upcomingCount,
      bySector: sectorCounts,
    },
    data: projects,
  };
};

const getProjectById = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

const deleteProject = async (id: string) => {
  try {
    await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw new Error((error instanceof Error ? error.message : String(error)) || "Failed to delete project");
  }
}

// Update the service export
export const projectService = {
  createProject,
  updateProject,
  getProjects,
  getProjectById,
  deleteProject,
};
