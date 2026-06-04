-- CreateTable
CREATE TABLE "QhsePolicy" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'main',
    "pageTitle" TEXT NOT NULL DEFAULT 'QHSE POLICY',
    "breadcrumbLabel" TEXT NOT NULL DEFAULT 'QHSE POLICY',
    "sectionTitle" TEXT NOT NULL DEFAULT 'QHSE POLICY',
    "heroImageUrl" TEXT NOT NULL,
    "policyStatement" TEXT NOT NULL,
    "bulletPoints" TEXT[],
    "analysisStatement" TEXT NOT NULL,
    "goldenRulesTitle" TEXT NOT NULL DEFAULT '12 Golden Safety Rules',
    "goldenRules" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QhsePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QhsePolicy_key_key" ON "QhsePolicy"("key");
