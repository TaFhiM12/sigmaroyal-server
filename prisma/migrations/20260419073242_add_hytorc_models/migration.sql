-- CreateTable
CREATE TABLE "HytorcCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "breadcrumb" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlight" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HytorcCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HytorcProduct" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "targetUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HytorcProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HytorcCategory_slug_key" ON "HytorcCategory"("slug");

-- CreateIndex
CREATE INDEX "HytorcProduct_categoryId_idx" ON "HytorcProduct"("categoryId");

-- AddForeignKey
ALTER TABLE "HytorcProduct" ADD CONSTRAINT "HytorcProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "HytorcCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
