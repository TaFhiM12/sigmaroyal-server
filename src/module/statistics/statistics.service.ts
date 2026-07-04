import { prisma } from "../../lib/prisma.js";

const FOUNDED_YEAR = 1977;

const getPublicStatistics = async () => {
  const [
    projects,
    completedProjects,
    ongoingProjects,
    upcomingProjects,
    projectSectors,
    clients,
    teamMembers,
    certifications,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "COMPLETED" } }),
    prisma.project.count({ where: { status: "ONGOING" } }),
    prisma.project.count({ where: { status: "UPCOMING" } }),
    prisma.project.groupBy({
      by: ["sector"],
      _count: { sector: true },
      orderBy: { sector: "asc" },
    }),
    prisma.client.count({ where: { isActive: true } }),
    prisma.employee.count({ where: { isActive: true } }),
    prisma.certificate.count({ where: { isActive: true } }),
  ]);

  return {
    foundedYear: FOUNDED_YEAR,
    yearsOperating: new Date().getUTCFullYear() - FOUNDED_YEAR,
    projects: {
      total: projects,
      completed: completedProjects,
      ongoing: ongoingProjects,
      upcoming: upcomingProjects,
      bySector: projectSectors.map((item) => ({
        sector: item.sector,
        count: item._count.sector,
      })),
    },
    clients,
    teamMembers,
    certifications,
  };
};

export const statisticsService = {
  getPublicStatistics,
};
