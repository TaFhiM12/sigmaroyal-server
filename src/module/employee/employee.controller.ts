import { Request, Response } from "express"
import { EmployeeService } from "./employee.service.js";

const createEmployee = async(req: Request, res: Response) => {
    try {
        const employeeData = req.body;
        const newEmployee = await EmployeeService.createEmployee(employeeData);
        res.status(201).json({
            success: true,
            data: newEmployee,
            message: "Employee created successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create employee"
        });
    }
}

const getEmployeeById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeService.getEmployeeById(id as string);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({
            success: true,
            data: employee,
            message: "Employee retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to get employee" });
    }
}

const getAllEmployees = async(req: Request, res: Response) => {
    try {
        const department = typeof req.query.department === "string" ? req.query.department : undefined;
        const includeInactive = req.query.includeInactive === "true";
        const employees = await EmployeeService.getAllEmployees({
            ...(department ? { department } : {}),
            includeInactive,
        });
        res.status(200).json({
            success: true,
            data: employees,
            message: "Employees retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to get employees" });
    }
}

const updateEmployee = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employeeData = req.body;
        const updatedEmployee = await EmployeeService.updateEmployee(id as string, employeeData);
        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedEmployee,
            message: "Employee updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to update employee"
        });
    }
}

const reorderEmployees = async(req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
            return res.status(400).json({
                success: false,
                message: "Employee ids are required",
            });
        }

        const result = await EmployeeService.reorderEmployees(ids);
        res.status(200).json({
            success: true,
            data: result,
            message: "Employee order updated successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to reorder employees" });
    }
}

const deleteEmployee = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await EmployeeService.deleteEmployee(id as string);
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({
            success: true,
            data: deletedEmployee,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee" });
    }
}

export const EmployeeController = {
    createEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    reorderEmployees,
    deleteEmployee,
}
