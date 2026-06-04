import { prisma } from "../../lib/prisma.js";

const getCategories = async (onlyActive = true) => {
  return prisma.hytorcCategory.findMany({
    ...(onlyActive ? { where: { isActive: true } } : {}),
    include: {
      products: onlyActive
        ? {
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          }
        : {
            orderBy: { sortOrder: "asc" },
          },
    },
    orderBy: { sortOrder: "asc" },
  });
};

const getCategoryBySlug = async (slug: string, onlyActive = true) => {
  const category = await prisma.hytorcCategory.findUnique({
    where: { slug },
    include: {
      products: onlyActive
        ? {
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          }
        : {
            orderBy: { sortOrder: "asc" },
          },
    },
  });

  if (!category) {
    throw new Error("HYTORC category not found");
  }

  return category;
};

const createCategory = async (payload: any) => {
  return prisma.hytorcCategory.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      breadcrumb: payload.breadcrumb,
      headline: payload.headline,
      description: payload.description,
      highlight: payload.highlight || null,
      sortOrder: Number(payload.sortOrder ?? 0),
      isActive: payload.isActive ?? true,
    },
  });
};

const updateCategory = async (id: string, payload: any) => {
  return prisma.hytorcCategory.update({
    where: { id },
    data: {
      title: payload.title,
      slug: payload.slug,
      breadcrumb: payload.breadcrumb,
      headline: payload.headline,
      description: payload.description,
      highlight: payload.highlight || null,
      sortOrder: Number(payload.sortOrder ?? 0),
      isActive: payload.isActive,
    },
  });
};

const deleteCategory = async (id: string) => {
  await prisma.hytorcCategory.delete({ where: { id } });
};

const createProduct = async (payload: any) => {
  return prisma.hytorcProduct.create({
    data: {
      categoryId: payload.categoryId,
      name: payload.name,
      imageUrl: payload.imageUrl,
      targetUrl: payload.targetUrl || null,
      sortOrder: Number(payload.sortOrder ?? 0),
      isActive: payload.isActive ?? true,
    },
  });
};

const updateProduct = async (id: string, payload: any) => {
  return prisma.hytorcProduct.update({
    where: { id },
    data: {
      categoryId: payload.categoryId,
      name: payload.name,
      imageUrl: payload.imageUrl,
      targetUrl: payload.targetUrl || null,
      sortOrder: Number(payload.sortOrder ?? 0),
      isActive: payload.isActive,
    },
  });
};

const deleteProduct = async (id: string) => {
  await prisma.hytorcProduct.delete({ where: { id } });
};

const seedDefaults = async () => {
  const existing = await prisma.hytorcCategory.count();
  if (existing > 0) {
    return { inserted: false, message: "HYTORC data already exists" };
  }

  const categories = [
    {
      title: "About",
      slug: "about",
      breadcrumb: "About",
      headline: "About",
      description:
        "With over two decades of experience in making complex industrial bolting jobs safer and simpler, Advanced Bolting Solutions Pvt. Ltd. is a leading multinational company with international presence in India and UAE that offer precision bolting solutions through consultative sales of HYTORC torqueing tools.",
      highlight:
        "In Partnership at exclusive basis, Royal will provide services of ABS-HYTORC in Bangladesh.",
      sortOrder: 1,
      products: [
        { name: "Hydraulic", imageUrl: "https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/hydraulic", sortOrder: 1 },
        { name: "Pneumatic", imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/pneumatic-torque-wrench", sortOrder: 2 },
        { name: "Electric", imageUrl: "https://images.unsplash.com/photo-1581147036324-c1c37d51497f?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/electric-torque-wrench", sortOrder: 3 },
        { name: "Pumps", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/pumps", sortOrder: 4 },
        { name: "Fasteners", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/fasteners", sortOrder: 5 },
        { name: "Accessories", imageUrl: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80", targetUrl: "/hytorc/accessories", sortOrder: 6 },
      ],
    },
    {
      title: "Hydraulic",
      slug: "hydraulic",
      breadcrumb: "Hydraulic",
      headline: "HYTORC Hydraulic Torque Wrenches engineered for precision and high output",
      description:
        "HYTORC hydraulic tools are designed for demanding industrial bolting with consistent torque accuracy and broad operational range.",
      sortOrder: 2,
      products: [
        { name: "MXT+", imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "Avanti", imageUrl: "https://images.unsplash.com/photo-1564844536311-de546a28c87f?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
      ],
    },
    {
      title: "Pneumatic Torque Wrench",
      slug: "pneumatic-torque-wrench",
      breadcrumb: "Pneumatic Torque Wrench",
      headline: "HYTORC Pneumatic Torque Wrenches, enhancing productivity by reducing job time",
      description:
        "Pneumatic torque systems with digital readout, dual speed mode and rugged operation for harsh industrial environments.",
      sortOrder: 3,
      products: [
        { name: "jGun Digital", imageUrl: "https://images.unsplash.com/photo-1591030434469-3d78c7b17820?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "jGun Dual Speed", imageUrl: "https://images.unsplash.com/photo-1505666287802-931dc83a0fe4?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
        { name: "jGun Single Speed", imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80", sortOrder: 3 },
      ],
    },
    {
      title: "Electric Torque Wrench",
      slug: "electric-torque-wrench",
      breadcrumb: "Electric Torque Wrench",
      headline: "HYTORC Electric Torque Wrenches, next-generation bolting tools offering data-recording and portability",
      description:
        "Cordless electric torque tools with data recording, dual speed operation and productivity features for field maintenance.",
      sortOrder: 4,
      products: [
        { name: "Lithium Series Two", imageUrl: "https://images.unsplash.com/photo-1611095965923-9f8b5fdaf9fd?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "Lithium Series", imageUrl: "https://images.unsplash.com/photo-1632200009323-755b380dd89c?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
        { name: "Lion Gun", imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80", sortOrder: 3 },
      ],
    },
    {
      title: "Pumps",
      slug: "pumps",
      breadcrumb: "Pumps",
      headline: "HYTORC Pumps, powers multiple tools simultaneously",
      description:
        "Advanced pressure hydraulic pumps built for multi-tool operation, precise control and field durability.",
      sortOrder: 5,
      products: [
        { name: "Vector", imageUrl: "https://images.unsplash.com/photo-1580901369227-308f4066f9d5?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "HY-115", imageUrl: "https://images.unsplash.com/photo-1581092918484-8313f2fca6e3?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
      ],
    },
    {
      title: "Fasteners",
      slug: "fasteners",
      breadcrumb: "Fasteners",
      headline: "Fasteners, enhances safety, productivity, and joint-integrity",
      description:
        "HYTORC hardware fasteners are engineered to reduce variance in bolt load and improve flange consistency.",
      sortOrder: 6,
      products: [
        { name: "HYTORC Washer", imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "HYTORC Nut", imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
      ],
    },
    {
      title: "Accessories",
      slug: "accessories",
      breadcrumb: "Accessories",
      headline: "HYTORC Accessories, customizable solutions for joint-integrity",
      description:
        "Industry-fit accessories and replacement components supporting precision bolting workflows.",
      sortOrder: 7,
      products: [
        { name: "Sockets", imageUrl: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        { name: "Reaction fixtures", imageUrl: "https://images.unsplash.com/photo-1609205267177-a7307fd685b7?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
        { name: "Offset Link", imageUrl: "https://images.unsplash.com/photo-1617201278817-7c32d63c5aa2?auto=format&fit=crop&w=800&q=80", sortOrder: 3 },
      ],
    },
  ];

  for (const category of categories) {
    const created = await prisma.hytorcCategory.create({
      data: {
        title: category.title,
        slug: category.slug,
        breadcrumb: category.breadcrumb,
        headline: category.headline,
        description: category.description,
        highlight: category.highlight || null,
        sortOrder: category.sortOrder,
        isActive: true,
      },
    });

    if (category.products.length > 0) {
      await prisma.hytorcProduct.createMany({
        data: category.products.map((item) => ({
          categoryId: created.id,
          name: item.name,
          imageUrl: item.imageUrl,
          targetUrl: "targetUrl" in item ? item.targetUrl || null : null,
          sortOrder: item.sortOrder,
          isActive: true,
        })),
      });
    }
  }

  return { inserted: true, message: "HYTORC default data seeded successfully" };
};

export const hytorcService = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaults,
};
