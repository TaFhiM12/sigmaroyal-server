// backend/src/modules/client/client.routes.ts
import { Router } from "express";
import { clientController } from "./client.controller";

const router = Router();

router.post("/", clientController.createClient);
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);
router.post("/reorder", clientController.reorderClients);

export const clientRouter = router;