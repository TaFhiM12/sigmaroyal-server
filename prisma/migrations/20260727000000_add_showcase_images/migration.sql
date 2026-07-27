CREATE TABLE "showcase_images" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "showcase_images_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "showcase_images_isActive_sortOrder_idx"
ON "showcase_images"("isActive", "sortOrder");

-- Seed the showcase from existing project photos.
INSERT INTO "showcase_images"
  ("id", "imageUrl", "title", "location", "sortOrder", "isActive", "createdAt", "updatedAt")
SELECT
  'project-seed-' || source."imageId",
  source."url",
  COALESCE(NULLIF(source."caption", ''), source."projectTitle"),
  source."location",
  source."position" - 1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM (
  SELECT
    image."id" AS "imageId",
    image."url",
    image."caption",
    project."title" AS "projectTitle",
    project."location",
    ROW_NUMBER() OVER (
      ORDER BY project."featured" DESC, project."updatedAt" DESC, image."id" ASC
    )::INTEGER AS "position"
  FROM "ProjectImage" image
  INNER JOIN "Project" project ON project."id" = image."projectId"
  WHERE BTRIM(image."url") <> ''
  LIMIT 12
) source
ON CONFLICT ("id") DO NOTHING;
