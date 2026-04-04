
import { Prisma, Project, ProjectStatus, Sector } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

// backend project.service.ts - Updated createProject
type CreateProjectPayload = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  images?: Array<{ url: string; caption?: string }>;
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
      status,
      featured,
      ...(images && images.length > 0 && {
        images: {
          create: images.map((img, index) => ({
            url: img.url,
            caption: img.caption || `Project image ${index + 1}`,
            isMain: index === 0, // First image becomes main
            order: index,
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

// Add updateProject function
// backend project.service.ts - Simplified updateProject without isMain/order
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
  if (status !== undefined) updateData.status = status;
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
        caption: img.caption,
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
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const where: Prisma.ProjectWhereInput = {};

  if (sector && Object.values(Sector).includes(sector as Sector)) {
    where.sector = sector as Sector;
  }

  if (status && Object.values(ProjectStatus).includes(status as ProjectStatus)) {
    where.status = status as ProjectStatus;
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
    "year",
    "title",
    "client",
  ];

  const orderBy: Prisma.ProjectOrderByWithRelationInput =
    validSortFields.includes(sortBy)
      ? {
          [sortBy]: sortOrder === "asc" ? "asc" : "desc",
        }
      : { createdAt: "desc" };

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

  const [completedCount, ongoingCount, sectorCounts] =
    await Promise.all([
      prisma.project.count({
        where: { status: "COMPLETED" },
      }),

      prisma.project.count({
        where: { status: "ONGOING" },
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
      bySector: sectorCounts,
    },
    data: projects,
  };
};


const getProjectBySlug = async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
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
  getProjectBySlug,
  deleteProject,
};

