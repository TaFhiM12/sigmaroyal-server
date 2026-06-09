import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

const demoPhotos = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
];

const team = [
  ["Core Management", "Zulfiquer Haider", "Director & CEO"],
  ["Core Management", "Fazle Khoda", "Director"],
  ["Core Management", "Engr. Ferdouse Alam Khan", "Executive Director"],
  ["Core Management", "Abu Md. Mustafa Kamal", "Director (Administration)"],
  ["Core Management", "Engr. Probir Kumar Barua", "Director, Technical"],
  ["Core Management", "Air Cdre M Al-Ameen Talukder", "CEO, Royal Yard, Bhulta"],
  ["Core Management", "Engr. Nizamul Hasan Sheriff", "Sr. Consultant"],
  ["Core Management", "Engr. A. B. M. Sharif", "Sr. General Manager (P&D)"],
  ["Core Management", "Gazi Muhammad Mahtab Hussain", "Deputy General Manager (Planning & Business Development)"],
  ["Core Management", "Md. Akkas Ali Biswas", "Deputy General Manager"],
  ["Core Management", "Md. Mazharul Islam (Zoha)", "Asst. General Manager (Instrumentation & Control System)"],
  ["Core Management", "Md. Shafieur Rahaman", "AGM"],

  ["HR & ADMIN", "Md. Taslimuzzaman Fakir", "Manager (HR & Admin)"],
  ["HR & ADMIN", "Md. Hasanuzzaman", "Executive HR"],
  ["HR & ADMIN", "Anika Tasnim", "Assistant Engineer"],
  ["HR & ADMIN", "Md. Zahangir Kabir", "Sr. Executive (HR)"],
  ["HR & ADMIN", "Jakia Sultana", "Executive (HR)"],

  ["Accounts & Finance", "Md. Younus", "Manager (Accounts)"],
  ["Accounts & Finance", "Saurav Saha", "Manager (Finance)"],
  ["Accounts & Finance", "Md. Samedul Islam", "Sr. Accounts Officer"],
  ["Accounts & Finance", "Abdul Hamid", "Executive (Account)"],
  ["Accounts & Finance", "M.A Khair", "Accounts Officer"],
  ["Accounts & Finance", "Garibe Naowai", "Sr. Executive (Accounts & Finance)"],
  ["Accounts & Finance", "Md. Fazlul Sheak", "Sr. Accounts Officer"],
  ["Accounts & Finance", "Md. Nure-Alam Khan", "Site Account. & Admin"],
  ["Accounts & Finance", "Nur Mohammad", "Accountant"],
  ["Accounts & Finance", "Harun Miah", "Site Accountant"],
  ["Accounts & Finance", "Md. Masudur Rahaman", "Project Accountant"],
  ["Accounts & Finance", "Saykat Ghosh", "Trainee Officer (Accounts)"],
  ["Accounts & Finance", "Mohiuddin Apu", "Assistant Manager (Finance)"],

  ["All Engineers", "Chand Mia", "Project Manager"],
  ["All Engineers", "Md. Hamidul Islam (Babu)", "Project Incharge"],
  ["All Engineers", "Md. Manik Hossain", "Sr. Engineer"],
  ["All Engineers", "Engr. Ahammad Ali Khan", "Sr. Engineer"],
  ["All Engineers", "Md Mahmudul Hassan Jubaeer", "Sr. Executive (IT & BD)"],
  ["All Engineers", "Mizanur Rahaman", "Construction Engineer"],
  ["All Engineers", "Md. Azizur Rahman", "Manager (Technical)"],
  ["All Engineers", "Md. Abdus Salam", "Sr. Engineer"],
  ["All Engineers", "Md. Mohidul Islam (Jack)", "QA/QC Engr."],
  ["All Engineers", "Md. Abu Jafor", "Civil Engineer"],
  ["All Engineers", "Md.Shamim Hossain", "Engineer QA/QC"],
  ["All Engineers", "Khayrul Islam", "Engr. QA/QC"],
  ["All Engineers", "Md. Khalid Bin Rakib", "Asst. Engineer"],
  ["All Engineers", "Md. Robiul Islam", "Site Engineer"],
  ["All Engineers", "Raju Miah", "QA/QC Engr."],
  ["All Engineers", "Shahneaz Irtekhar", "Assistant Engineer"],
  ["All Engineers", "Md. Rajibul Islam", "Asst. Engr. QA/QC"],
  ["All Engineers", "Arifin Miah", "Assistant Engineer"],
  ["All Engineers", "Md. Shajirul Islam", "Asst. Engineer"],
  ["All Engineers", "Amit Hassan", "Assistant Engineer Procurement"],
];

async function main() {
  const departments = [...new Set(team.map(([department]) => department))];

  await prisma.employee.deleteMany({
    where: {
      department: {
        in: departments,
      },
    },
  });

  await prisma.employee.createMany({
    data: team.map(([department, name, designation], index) => ({
      department,
      name,
      designation,
      bio: "",
      photoUrl: demoPhotos[index % demoPhotos.length],
      isActive: true,
      orderIndex: index + 1,
    })),
  });

  console.log(`Seeded ${team.length} team members.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
