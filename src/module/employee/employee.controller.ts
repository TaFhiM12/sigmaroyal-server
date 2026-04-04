import { Request, Response } from "express"
import { EmployeeService } from "./employee.service";
import { success } from "better-auth";

const createEmployee = async(req: Request, res: Response) => {
    // Implementation for creating an employee
    try {
        const employeeData = req.body;
        // Validate employeeData here if necessary

        // Call the service to create the employee
        const newEmployee = await EmployeeService.createEmployee(employeeData);
        res.status(201).json({
            success: true,
            data: newEmployee,
            message: "Employee created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee" });
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
        const employees = await EmployeeService.getAllEmployees();
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
        res.status(500).json({ error: "Failed to update employee" });
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
    deleteEmployee,
}