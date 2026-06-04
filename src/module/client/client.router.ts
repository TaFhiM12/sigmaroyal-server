// backend/src/modules/client/client.routes.ts
import { Router } from "express";
import { clientController } from "./client.controller";
import { requireAdminAuth } from "../../middleware/requireAdminAuth";

const router = Router();

router.post("/", requireAdminAuth, clientController.createClient);
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.put("/:id", requireAdminAuth, clientController.updateClient);
router.delete("/:id", requireAdminAuth, clientController.deleteClient);
router.post("/reorder", requireAdminAuth, clientController.reorderClients);

export const clientRouter = router;