import { Prisma } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { defaultPageContents } from "./page-content.defaults.js";

type PageContentPayload = {
  label?: string;
  path?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImageUrl?: string | null;
  introTitle?: string | null;
  introBody?: string | null;
  sections?: Prisma.InputJsonValue;
  seoTitle?: string | null;
  seoDescription?: string | null;
  isPublished?: boolean;
};

const normalizePayload = (payload: PageContentPayload) => {
  const data: Prisma.PageContentUpdateInput = {};

  if (payload.label !== undefined) data.label = payload.label;
  if (payload.path !== undefined) data.path = payload.path;
  if (payload.heroTitle !== undefined) data.heroTitle = payload.heroTitle;
  if (payload.heroSubtitle !== undefined) data.heroSubtitle = payload.heroSubtitle;
  if (payload.heroImageUrl !== undefined) data.heroImageUrl = payload.heroImageUrl;
  if (payload.introTitle !== undefined) data.introTitle = payload.introTitle;
  if (payload.introBody !== undefined) data.introBody = payload.introBody;
  if (payload.sections !== undefined) data.sections = payload.sections;
  if (payload.seoTitle !== undefined) data.seoTitle = payload.seoTitle;
  if (payload.seoDescription !== undefined) data.seoDescription = payload.seoDescription;
  if (payload.isPublished !== undefined) data.isPublished = payload.isPublished;

  return data;
};

const listPageContents = async () => {
  return prisma.pageContent.findMany({
    orderBy: [{ label: "asc" }],
  });
};

const getPublicPageContent = async (slug: string) => {
  return prisma.pageContent.findFirst({
    where: { slug, isPublished: true },
  });
};

const getAdminPageContent = async (slug: string) => {
  const page = await prisma.pageContent.findUnique({ where: { slug } });
  if (!page) throw new Error("Page content not found");
  return page;
};

const upsertPageContent = async (slug: string, payload: PageContentPayload) => {
  const data = normalizePayload(payload);
  const defaultContent = defaultPageContents.find((item) => item.slug === slug);

  return prisma.pageContent.upsert({
    where: { slug },
    create: {
      slug,
      label: payload.label || defaultContent?.label || slug,
      path: payload.path ?? defaultContent?.path ?? null,
      heroTitle: payload.heroTitle ?? defaultContent?.heroTitle ?? null,
      heroSubtitle: payload.heroSubtitle ?? defaultContent?.heroSubtitle ?? null,
      heroImageUrl: payload.heroImageUrl ?? defaultContent?.heroImageUrl ?? null,
      introTitle: payload.introTitle ?? defaultContent?.introTitle ?? null,
      introBody: payload.introBody ?? defaultContent?.introBody ?? null,
      sections: payload.sections ?? [],
      seoTitle: payload.seoTitle ?? defaultContent?.seoTitle ?? null,
      seoDescription: payload.seoDescription ?? defaultContent?.seoDescription ?? null,
      isPublished: payload.isPublished ?? true,
    },
    update: data,
  });
};

const seedDefaultPageContents = async () => {
  const results = [];

  for (const item of defaultPageContents) {
    const result = await prisma.pageContent.upsert({
        where: { slug: item.slug },
        create: { ...item, sections: [] },
        update: {
          label: item.label,
          path: item.path,
        },
      });
    results.push(result);
  }

  return {
    inserted: results.length,
    data: results,
  };
};

export const pageContentService = {
  listPageContents,
  getPublicPageContent,
  getAdminPageContent,
  upsertPageContent,
  seedDefaultPageContents,
};
