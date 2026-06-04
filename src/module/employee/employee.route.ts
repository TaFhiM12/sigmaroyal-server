import { Router } from "express";
import { EmployeeController } from "./employee.controller.js";
import { requireAdminAuth } from "../../middleware/requireAdminAuth.js";

const router = Router();



router.post("/", requireAdminAuth, EmployeeController.createEmployee);
router.get("/:id", EmployeeController.getEmployeeById);
router.get("/", EmployeeController.getAllEmployees);
router.put("/:id", requireAdminAuth, EmployeeController.updateEmployee);
router.delete("/:id", requireAdminAuth, EmployeeController.deleteEmployee);

export const employeeRoutes = router;
