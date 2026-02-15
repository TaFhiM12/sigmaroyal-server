
import { Prisma, Project, ProjectStatus, Sector } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

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
      ...(images && {
        images: {
          create: images.map((img) => ({
            url: img.url,
            ...(img.caption !== undefined && { caption: img.caption }),
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

  /* --------------------------------------------
     WHERE FILTER BUILDING
  --------------------------------------------- */

  const where: Prisma.ProjectWhereInput = {};

  // Enum-safe sector filter
  if (sector && Object.values(Sector).includes(sector as Sector)) {
    where.sector = sector as Sector;
  }

  // Enum-safe status filter
  if (status && Object.values(ProjectStatus).includes(status as ProjectStatus)) {
    where.status = status as ProjectStatus;
  }

  // Featured filter
  if (featured !== undefined) {
    where.featured = featured === "true";
  }

  // Year filter
  if (year) {
    where.year = Number(year);
  }

  // Client search filter
  if (client) {
    where.client = {
      contains: client,
      mode: "insensitive",
    };
  }

  // Global search
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
    ];
  }

  /* --------------------------------------------
     SORTING SAFE HANDLING
  --------------------------------------------- */

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

  /* --------------------------------------------
     FETCH PROJECTS + COUNTS
  --------------------------------------------- */

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

  /* --------------------------------------------
     EXTRA COUNTS (Dashboard Ready)
  --------------------------------------------- */

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


export const projectService = {
  createProject,
  getProjects,
  getProjectBySlug,
};
