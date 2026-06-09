import { Prisma } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";

type EmployeePayload = {
    name?: string;
    designation?: string;
    department?: string;
    bio?: string;
    photoUrl?: string;
    phone?: string | null;
    email?: string | null;
    isActive?: boolean;
    experienceYears?: number | null;
    education?: string | null;
    orderIndex?: number | null;
};

type EmployeeQuery = {
    department?: string;
    includeInactive?: boolean;
};

const DEFAULT_PHOTO_URL = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop";

const normalizeEmployeeData = (employeeData: EmployeePayload) => {
    const name = employeeData.name?.trim();
    const designation = employeeData.designation?.trim();
    const department = employeeData.department?.trim();

    if (!name || !designation || !department) {
        throw new Error("Name, designation, and department are required");
    }

    return {
        name,
        designation,
        department,
        bio: employeeData.bio?.trim() || "",
        photoUrl: employeeData.photoUrl?.trim() || DEFAULT_PHOTO_URL,
        phone: employeeData.phone?.trim() || null,
        email: employeeData.email?.trim() || null,
        isActive: employeeData.isActive ?? true,
        experienceYears: employeeData.experienceYears ?? null,
        education: employeeData.education?.trim() || null,
        orderIndex: employeeData.orderIndex ?? 0,
    };
};

const createEmployee = async (employeeData: EmployeePayload) => {
    const employee = await prisma.employee.create({
        data: normalizeEmployeeData(employeeData),
    });
    return employee;
}

const getEmployeeById = async (id: string) => {
    const employee = await prisma.employee.findUnique({
        where: { id },
    });
    return employee;
}

const getAllEmployees = async (query: EmployeeQuery = {}) => {
    const where: Prisma.EmployeeWhereInput = {};

    if (!query.includeInactive) {
        where.isActive = true;
    }

    if (query.department) {
        where.department = {
            equals: query.department,
            mode: "insensitive",
        };
    }

    const employees = await prisma.employee.findMany({
        where,
        orderBy: [
            { department: "asc" },
            { orderIndex: "asc" },
            { name: "asc" },
        ],
    });
    return employees;
}

const updateEmployee = async (id: string, employeeData: EmployeePayload) => {
    const data: Prisma.EmployeeUpdateInput = {
        ...normalizeEmployeeData(employeeData),
    };

    const employee = await prisma.employee.update({
        where: { id },
        data,
    });
    return employee;
}

const reorderEmployees = async (ids: string[]) => {
    await prisma.$transaction(
        ids.map((id, index) =>
            prisma.employee.update({
                where: { id },
                data: { orderIndex: index + 1 },
            })
        )
    );

    return { message: "Employee order updated successfully" };
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
    reorderEmployees,
    deleteEmployee,
}
