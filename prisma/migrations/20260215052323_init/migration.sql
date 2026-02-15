/*
  Warnings:

  - You are about to drop the column `businessSector` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `contractRole` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `durationDays` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `durationText` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endPrecision` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `footprint` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `lifecycleStatus` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `mainContractorId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioCategory` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startPrecision` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectSpec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyRole` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scopeOfWork` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('OIL_GAS', 'POWER_SECTOR', 'LNG', 'LPG', 'NG', 'REFINERY', 'PETROCHEMICAL', 'WATER_DISTRIBUTION', 'INFRASTRUCTURE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'ONGOING');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_mainContractorId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectAsset" DROP CONSTRAINT "ProjectAsset_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectLocation" DROP CONSTRAINT "ProjectLocation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSpec" DROP CONSTRAINT "ProjectSpec_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_tagId_fkey";

-- DropIndex
DROP INDEX "Project_businessSector_contractRole_idx";

-- DropIndex
DROP INDEX "Project_clientId_idx";

-- DropIndex
DROP INDEX "Project_code_key";

-- DropIndex
DROP INDEX "Project_mainContractorId_idx";

-- DropIndex
DROP INDEX "Project_portfolioCategory_lifecycleStatus_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "businessSector",
DROP COLUMN "clientId",
DROP COLUMN "code",
DROP COLUMN "contractRole",
DROP COLUMN "durationDays",
DROP COLUMN "durationText",
DROP COLUMN "endDate",
DROP COLUMN "endPrecision",
DROP COLUMN "footprint",
DROP COLUMN "isFeatured",
DROP COLUMN "keywords",
DROP COLUMN "lifecycleStatus",
DROP COLUMN "mainContractorId",
DROP COLUMN "name",
DROP COLUMN "portfolioCategory",
DROP COLUMN "startDate",
DROP COLUMN "startPrecision",
DROP COLUMN "summary",
ADD COLUMN     "capacity" TEXT,
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "companyRole" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "scopeOfWork" TEXT NOT NULL,
ADD COLUMN     "sector" "Sector" NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETED',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "ProjectAsset";

-- DropTable
DROP TABLE "ProjectLocation";

-- DropTable
DROP TABLE "ProjectSpec";

-- DropTable
DROP TABLE "ProjectTag";

-- DropTable
DROP TABLE "Tag";

-- DropEnum
DROP TYPE "AssetType";

-- DropEnum
DROP TYPE "BusinessSector";

-- DropEnum
DROP TYPE "ClientType";

-- DropEnum
DROP TYPE "ContractRole";

-- DropEnum
DROP TYPE "DatePrecision";

-- DropEnum
DROP TYPE "FootprintType";

-- DropEnum
DROP TYPE "ProjectLifecycleStatus";

-- DropEnum
DROP TYPE "ProjectPortfolioCategory";

-- DropEnum
DROP TYPE "UnitSystem";

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
