
// This file should only contain backend logic, not React/Next code.
// Example: Service functions for QHSE policy

import { QhsePolicy } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

export const qhsePolicyService = {
  async getPolicy() {
    return await prisma.qhsePolicy.findFirst({ where: { key: "main" } });
  },
  async updatePolicy(data: Partial<QhsePolicy>) {
    if (!data.key) throw new Error("Missing policy key");
    return await prisma.qhsePolicy.update({ where: { key: data.key }, data });
  },
  async seedDefaultPolicy() {
    // Remove any existing policy with key 'main' first
    await prisma.qhsePolicy.deleteMany({ where: { key: "main" } });
    const data = await prisma.qhsePolicy.create({
      data: {
        key: "main",
        pageTitle: "QHSE POLICY",
        breadcrumbLabel: "QHSE POLICY",
        sectionTitle: "QHSE POLICY",
        heroImageUrl: "https://sigma-royal.com/images/qhse-banner.jpg",
        policyStatement: "We are committed to the highest standards of Quality, Health, Safety, and Environment.",
        bulletPoints: [
          "Zero harm to people, property, and environment.",
          "Comply with all legal and regulatory requirements.",
          "Promote a culture of safety and continuous improvement.",
          "Empower employees to stop unsafe work.",
        ],
        analysisStatement: "Our proactive approach ensures risks are identified and mitigated before incidents occur.",
        goldenRulesTitle: "12 Golden Safety Rules",
        goldenRules: [
          "Work with a valid permit when required.",
          "Conduct risk assessments before starting work.",
          "Use the correct PPE for the task.",
          "Verify isolation before work begins.",
          "Obtain authorization before entering confined spaces.",
          "Protect yourself against falls when working at height.",
          "No alcohol or drugs on site.",
          "No smoking outside designated areas.",
          "Obey speed limits and drive safely.",
          "Report all incidents and near misses.",
          "Follow lifting and rigging procedures.",
          "Maintain good housekeeping at all times."
        ],
        isActive: true,
      },
    });
    return { message: "Seeded default QHSE policy", data, inserted: true };
  },
  async deleteDefaultPolicy() {
    const deleted = await prisma.qhsePolicy.deleteMany({ where: { key: "main" } });
    return { message: "Deleted default QHSE policy", count: deleted.count };
  },
};
