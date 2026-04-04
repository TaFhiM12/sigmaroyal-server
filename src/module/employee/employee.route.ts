import { Router } from "express";
import { EmployeeController } from "./employee.controller";

const router = Router();



router.post("/", EmployeeController.createEmployee);
router.get("/:id", EmployeeController.getEmployeeById);
router.get("/", EmployeeController.getAllEmployees);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

export const employeeRoutes = router;