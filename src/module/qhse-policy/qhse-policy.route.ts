import { Router } from "express";
import { qhsePolicyController } from "./qhse-policy.controller";
import { requireAdminAuth } from "../../middleware/requireAdminAuth";

const router = Router();


router.get("/", qhsePolicyController.getPolicy);
router.put("/", requireAdminAuth, qhsePolicyController.updatePolicy);
router.post("/seed-default", requireAdminAuth, qhsePolicyController.seedDefaultPolicy);
router.delete("/delete-default", requireAdminAuth, qhsePolicyController.deleteDefaultPolicy);

export const qhsePolicyRoutes = router;
