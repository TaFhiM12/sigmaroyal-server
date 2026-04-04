import { Employee } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createEmployee = async (employeeData: Employee) => {
    const employee = await prisma.employee.create({
        data: employeeData,
    });
    return employee;
}

const getEmployeeById = async (id: string) => {
    const employee = await prisma.employee.findUnique({
        where: { id },
    });
    return employee;
}

const getAllEmployees = async () => {
    const employees = await prisma.employee.findMany({
        orderBy: { orderIndex: 'asc' },
    });
    return employees;
}

const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    const employee = await prisma.employee.update({
        where: { id },
        data: employeeData,
    });
    return employee;
}

const deleteEmployee = async (id: string) => {
    await prisma.employee.delete({
        where: { id },
    });
    return { message: "Employee deleted successfully" };
}

export const EmployeeService = {
    createEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
}