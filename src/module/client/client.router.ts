// backend/src/modules/client/client.routes.ts
import { Router } from "express";
import { clientController } from "./client.controller.js";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";

const router = Router();

router.post("/", requireAdminAuth, clientController.createClient);
router.get("/", clientController.getAllClients);
router.post("/reorder", requireAdminAuth, clientController.reorderClients);
router.get("/:id", clientController.getClientById);
router.put("/:id", requireAdminAuth, clientController.updateClient);
router.delete("/:id", requireAdminAuth, clientController.deleteClient);

export const clientRouter = router;
