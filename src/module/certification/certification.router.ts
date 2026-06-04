// backend/src/modules/certification/certification.routes.ts
import { Router } from "express";
import { certificationController } from "./certification.controller";
import { requireAdminAuth } from "../../middleware/requireAdminAuth";

const router = Router();

router.post("/", requireAdminAuth, certificationController.createCertification);
router.get("/", certificationController.getAllCertifications);
router.get("/:id", certificationController.getCertificationById);
router.put("/:id", requireAdminAuth, certificationController.updateCertification);
router.delete("/:id", requireAdminAuth, certificationController.deleteCertification);
router.post("/reorder", requireAdminAuth, certificationController.reorderCertifications);

export const certificationRouter = router;