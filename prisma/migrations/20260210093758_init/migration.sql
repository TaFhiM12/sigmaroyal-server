-- CreateEnum
CREATE TYPE "ProjectLifecycleStatus" AS ENUM ('PLANNED', 'ONGOING', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProjectPortfolioCategory" AS ENUM ('CURRENT_DEVELOPMENT', 'COMPLETED_PROJECT', 'EMERGENCY_RESPONSE', 'TRACK_RECORD');

-- CreateEnum
CREATE TYPE "BusinessSector" AS ENUM ('OIL_GAS', 'POWER', 'PROCESS_PLANT', 'ENGINEERING_SERVICES', 'LPG_SNG', 'OTHER');

-- CreateEnum
CREATE TYPE "ContractRole" AS ENUM ('CONTRACTOR', 'SUBCONTRACTOR', 'EPC_CONTRACTOR', 'JV_PARTNER', 'CONSULTANT', 'SUPPLIER', 'OTHER');

-- CreateEnum
CREATE TYPE "FootprintType" AS ENUM ('CONSTRUCTION_WORKS', 'WQT_WORKS', 'CONTRACT_SIGNING', 'MAINTENANCE_WORKS', 'OTHER');

-- CreateEnum
CREATE TYPE "DatePrecision" AS ENUM ('EXACT', 'MONTH', 'YEAR', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('METRIC', 'IMPERIAL', 'MIXED');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('GOVERNMENT', 'STATE_OWNED', 'PRIVATE', 'JV_PARTNER', 'INTERNATIONAL', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'PDF', 'DOC', 'VIDEO', 'LINK');

-- CreateTable
CREATE TABLE "ProjectAsset" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ClientType" NOT NULL DEFAULT 'UNKNOWN',
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectLocation" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "country" TEXT DEFAULT 'Bangladesh',
    "division" TEXT,
    "district" TEXT,
    "city" TEXT,
    "area" TEXT,
    "lat" DECIMAL(9,6),
    "lng" DECIMAL(9,6),

    CONSTRAINT "ProjectLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "portfolioCategory" "ProjectPortfolioCategory" NOT NULL,
    "lifecycleStatus" "ProjectLifecycleStatus" NOT NULL DEFAULT 'ONGOING',
    "businessSector" "BusinessSector" NOT NULL,
    "footprint" "FootprintType",
    "clientId" TEXT,
    "contractRole" "ContractRole" NOT NULL,
    "mainContractorId" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "startPrecision" "DatePrecision" NOT NULL DEFAULT 'UNKNOWN',
    "endPrecision" "DatePrecision" NOT NULL DEFAULT 'UNKNOWN',
    "durationText" TEXT,
    "durationDays" INTEGER,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSpec" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "valueText" TEXT,
    "valueNumber" DECIMAL(18,6),
    "valueUnit" TEXT,
    "unitSystem" "UnitSystem",
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "projectId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("projectId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE INDEX "ProjectLocation_projectId_idx" ON "ProjectLocation"("projectId");

-- CreateIndex
CREATE INDEX "ProjectLocation_district_city_idx" ON "ProjectLocation"("district", "city");

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_portfolioCategory_lifecycleStatus_idx" ON "Project"("portfolioCategory", "lifecycleStatus");

-- CreateIndex
CREATE INDEX "Project_businessSector_contractRole_idx" ON "Project"("businessSector", "contractRole");

-- CreateIndex
CREATE INDEX "Project_clientId_idx" ON "Project"("clientId");

-- CreateIndex
CREATE INDEX "Project_mainContractorId_idx" ON "Project"("mainContractorId");

-- CreateIndex
CREATE INDEX "ProjectSpec_projectId_key_idx" ON "ProjectSpec"("projectId", "key");

-- CreateIndex
CREATE INDEX "ProjectSpec_key_idx" ON "ProjectSpec"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "ProjectTag_tagId_idx" ON "ProjectTag"("tagId");

-- AddForeignKey
ALTER TABLE "ProjectAsset" ADD CONSTRAINT "ProjectAsset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectLocation" ADD CONSTRAINT "ProjectLocation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_mainContractorId_fkey" FOREIGN KEY ("mainContractorId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSpec" ADD CONSTRAINT "ProjectSpec_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
