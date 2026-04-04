// backend/src/modules/certification/certification.routes.ts
import { Router } from "express";
import { certificationController } from "./certification.controller";

const router = Router();

router.post("/", certificationController.createCertification);
router.get("/", certificationController.getAllCertifications);
router.get("/:id", certificationController.getCertificationById);
router.put("/:id", certificationController.updateCertification);
router.delete("/:id", certificationController.deleteCertification);
router.post("/reorder", certificationController.reorderCertifications);

export const certificationRouter = router;