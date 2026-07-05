import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { ProjectStatus, Sector } from "../generated/prisma/index.js";

type BrochureProject = {
  title: string;
  sector: Sector;
  client: string;
  companyRole: string;
  location: string;
  capacity?: string;
  duration?: string;
  year?: number;
  scopeOfWork: string;
  description?: string;
  status: ProjectStatus;
  featured?: boolean;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);

const projects: BrochureProject[] = [
  {
    title: "Comilla Economic Zone 100 MMSCFD City Gate Station",
    sector: Sector.NG,
    client: "Comilla Economic Zone Ltd.",
    companyRole: "Sub-contractor",
    location: "Gazaria, Meghnaghat, Munshiganj",
    capacity: "100 MMSCFD",
    duration: "1 year",
    scopeOfWork:
      "Procurement of one 100 MMSCFD capacity City Gate Station at Gazaria for Comilla Economic Zone Ltd. on design, supply and installation services Turn-Key/EPC basis.",
    status: ProjectStatus.ONGOING,
    featured: true,
  },
  {
    title: "Karnatali and Sitalakkhya River HDD Pipeline EPC Works",
    sector: Sector.NG,
    client: "Titas Gas Transmission Company Limited",
    companyRole: "Contractor",
    location: "Narayanganj",
    capacity: "Two 20 inch submerged natural gas pipelines",
    duration: "1 year",
    scopeOfWork:
      "Design-build and turnkey completion of two 20 inch submerged natural gas pipelines across Karnatali River and Sitalakkhya River by HDD method, including tie-in with existing pipelines on each bank and associated pipelines.",
    status: ProjectStatus.ONGOING,
    featured: true,
  },
  {
    title: "Gazaria Meghnaghat Haripur Metering Stations",
    sector: Sector.NG,
    client: "Gas Transmission Company Limited (GTCL)",
    companyRole: "Sub-contractor of CPP",
    location: "Gazaria, Meghnaghat and Haripur",
    capacity: "300 MMSCFD, 600 MMSCFD and 300 MMSCFD",
    duration: "1 year",
    scopeOfWork:
      "Procurement of 300 MMSCFD metering station at Gazaria, 600 MMSCFD metering station at Meghnaghat and 300 MMSCFD metering station at Haripur on design, supply and installation Turn-Key/EPC basis.",
    status: ProjectStatus.ONGOING,
    featured: true,
  },
  {
    title: "Bangladesh BMH Gas Transmission Pipeline HDD Lot 3",
    sector: Sector.NG,
    client: "China Petroleum Pipeline Engineering Co., Ltd. (CPP)",
    companyRole: "Sub-contractor",
    location: "Meghnaghat",
    duration: "6 months",
    scopeOfWork:
      "Construction of Bangladesh BMH Gas Transmission Pipeline Project HDD works, Lot-3, under China Petroleum Pipeline Engineering Co., Ltd.",
    status: ProjectStatus.ONGOING,
  },
  {
    title: "BGFCL Gas Flow Computer Packages Turn-key Supply",
    sector: Sector.NG,
    client: "Bangladesh Gas Fields Company Ltd. (BGFCL)",
    companyRole: "Sub-contractor of Cotmac",
    location: "BGFCL area",
    duration: "1 year",
    scopeOfWork:
      "Design, engineering, supply, installation, testing and commissioning of gas flow computer packages including hook-up with the existing sales gas metering system for upgrading the existing sales gas metering systems on turn-key basis.",
    status: ProjectStatus.ONGOING,
  },
  {
    title: "Three District Regulating Stations at Saidpur, Rangpur and Pirganj",
    sector: Sector.NG,
    client: "PGCL",
    companyRole: "Turn-key/EPC contractor",
    location: "Saidpur, Rangpur and Pirganj",
    capacity: "65 MMSCFD, 25 MMSCFD and 10 MMSCFD",
    scopeOfWork:
      "Design, engineering, procurement and supply, installation, construction, testing and commissioning of three District Regulating Stations.",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "100 MMSCFD CGS for Bangladesh Special Economic Zone",
    sector: Sector.NG,
    client: "TITAS",
    companyRole: "Construction contractor",
    location: "Araihazar, Narayanganj",
    capacity: "100 MMSCFD",
    scopeOfWork:
      "Construction of a CGS to supply natural gas to Bangladesh Special Economic Zone (Japanese Economic Zone).",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "Rangpur Gas Distribution Pipeline Group 4",
    sector: Sector.NG,
    client: "PGCL",
    companyRole: "Pipeline construction contractor",
    location: "Rangpur",
    capacity: "12 inch dia x 140 psig x 10 km",
    duration: "6 months",
    scopeOfWork:
      "Construction of 12 inch dia x 140 psig x 10 km gas distribution pipeline in Rangpur area, Group-4.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Saidpur and Nilphamari Gas Distribution Pipeline Group 5",
    sector: Sector.NG,
    client: "PGCL",
    companyRole: "Pipeline construction contractor",
    location: "Saidpur and Nilphamari",
    capacity: "16 inch dia x 140 psig x 09 km",
    scopeOfWork:
      "Construction of 16 inch dia x 140 psig x 09 km gas distribution pipeline in Saidpur and Nilphamari area, Group-5.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Saidpur and Nilphamari Gas Distribution Pipeline Group 6",
    sector: Sector.NG,
    client: "PGCL",
    companyRole: "Pipeline construction contractor",
    location: "Saidpur and Nilphamari",
    capacity: "16 inch dia x 140 psig x 06 km and 8 inch dia x 140 psig x 6.3 km",
    scopeOfWork:
      "Construction of 16 inch dia x 140 psig x 06 km and 8 inch dia x 140 psig x 6.3 km gas distribution pipeline in Saidpur and Nilphamari area, Group-6.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chattogram to Dhaka Oil Pipeline Construction",
    sector: Sector.OIL_GAS,
    client: "Monico Limited",
    companyRole: "Pipeline construction contractor",
    location: "Chattogram to Dhaka",
    scopeOfWork:
      "Laying and construction of steel pipelines for transportation of oil through Pipeline from Chattogram to Dhaka (CDPL) under Bangladesh Petroleum Corporation.",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "Jogipole Khulna 20 MMSCFD DRS",
    sector: Sector.NG,
    client: "Sundarban Gas Company Limited (SGCL)",
    companyRole: "Contractor",
    location: "Jogipole, Khulna",
    capacity: "20 MMSCFD",
    duration: "6 months",
    scopeOfWork:
      "Construction of 20 MMSCFD capacity DRS along with security room, area lighting and other associated works at Jogipole, Khulna.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Teligati Valve Pit to Zogipole DRS Gas Distribution Pipeline",
    sector: Sector.NG,
    client: "Sundarban Gas Company Limited (SGCL)",
    companyRole: "Contractor",
    location: "Khulna",
    capacity: "10 inch x 300 psig x 3.2 km",
    duration: "6 months",
    scopeOfWork:
      "Construction of 10 inch x 300 psig x 3.2 km main gas distribution pipeline from proposed Teligati Valve Pit to proposed SGCL DRS at Zogipole, Khulna.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Japanese Economic Zone Gas Pipe Removal Works",
    sector: Sector.NG,
    client: "Japanese Economic Zone",
    companyRole: "Contractor",
    location: "BSEZ, Japanese Economic Zone, Araihazar, Narayanganj",
    duration: "6 months",
    scopeOfWork:
      "Gas pipe removal works at BSEZ, Japanese Economic Zone, Araihazar, Narayanganj.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Dhanua GMMS Plug Valve Repair and Maintenance",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Dhanua GMMS, Gazipur",
    capacity: '8" OD plug valve at kicker line of 20" OD Dhanua-Savar pipeline',
    duration: "1 month",
    scopeOfWork:
      "Repair and maintenance works of 8 inch OD plug valve at kicker line of 20 inch OD Dhanua-Savar gas transmission pipeline at Dhanua GMMS, Gazipur.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Rashidpur-Ashuganj Hot Tapping Area Repair",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Madhobpur, Habiganj",
    capacity: '12" OD hot tapping area of 30" OD gas transmission pipeline',
    duration: "3 days",
    scopeOfWork:
      "Repair and maintenance works of 12 inch OD hot tapping area of 30 inch OD Rashidpur-Ashuganj gas transmission pipeline.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "UMPL Meghnaghat Valve Support Fencing and Floor Casting",
    sector: Sector.POWER_SECTOR,
    client: "SFL Unique Nebras, Meghnaghat Power PLC",
    companyRole: "Contractor",
    location: "Meghnaghat Power Hub",
    capacity: "20 inch valve support near 30 inch valve station",
    duration: "1 year",
    scopeOfWork:
      "Design, drawing and construction of fencing and floor casting of 20 inch valve support of UMPL near the 30 inch valve station at Meghnaghat Power Hub.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bonpara-Rajshahi Pipeline Bend Emergency Replacement at Horian",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Horian, Belpukur, Rajshahi",
    capacity: '12" OD Bonpara-Rajshahi gas transmission pipeline',
    duration: "3 days",
    scopeOfWork:
      "Leakage repair by replacing 12 inch dia x 90 inch long radius induction bend of Bonpara-Rajshahi gas transmission pipeline on emergency basis.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Pirganj Inauguration Flare Stack and Access Works",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Pirganj",
    capacity: '30" OD x 150 km x 1000 psig pipeline inauguration works',
    duration: "2 days",
    scopeOfWork:
      "Procurement and supply, construction and commissioning of flare stack, inaugural foundation stone, access road, parking yard, stage, pandal with canopy and related works for GTCL pipeline inauguration and PGCL gas network foundation laying ceremony.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "TGTDCL Supervised 20 Inch Gas Pipeline for Meghnaghat Power",
    sector: Sector.POWER_SECTOR,
    client: "TITAS Gas Transmission & Distribution Co. Ltd.",
    companyRole: "Subcontractor of China Energy Engineering Group Northeast No.1 Electric Power Construction Co., Ltd. (NEPC)",
    location: "Meghnaghat",
    capacity: '20 inch dia x 1000 psig x 600 meter',
    duration: "4 months",
    scopeOfWork:
      "Construction of 20 inch dia x 1000 psig x 600 meter gas pipeline under the supervision of Titas Gas Transmission and Distribution Company Ltd.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bhola 10 Inch High Pressure Pipeline Leakage Repair",
    sector: Sector.NG,
    client: "Sundarban Gas Company Limited (SGCL)",
    companyRole: "Contractor",
    location: "Bhola",
    capacity: '10 inch dia x 1000 psig x 33 km high pressure pipeline',
    duration: "1 month",
    scopeOfWork:
      "Seven leakage repairs by replacement of 10 inch dia x 5 feet long pipe spool at 10 inch dia high pressure pipeline in Bhola.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "SGCL Kushtia DRS Shed and Operating Platform",
    sector: Sector.NG,
    client: "Sundarban Gas Company Limited (SGCL)",
    companyRole: "Contractor",
    location: "Bottoil, Kushtia",
    duration: "1 month",
    scopeOfWork: "Construction of shed and operating platform for SGCL's Kushtia DRS at Bottoil, Kushtia.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Reliance Meghnaghat 718 MW CCPP Regulating and Metering Facilities",
    sector: Sector.POWER_SECTOR,
    client: "EMERSON",
    companyRole: "Design, construction, installation and commissioning contractor",
    location: "Meghnaghat",
    capacity: "150 MMSCFD",
    scopeOfWork:
      "Design, construction, installation and commissioning of regulating and metering facilities for Reliance Meghnaghat 718 MW CCPP with associated civil works and buildings.",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "Gonabhaban Gas Supply Distribution Line and DRS",
    sector: Sector.NG,
    client: "Titas Gas T&D Co. Ltd.",
    companyRole: "Distribution line and DRS construction contractor",
    location: "Gonabhaban, Dhaka",
    scopeOfWork:
      "Uninterrupted gas supply distribution line and DRS construction at the residence of the Honorable Prime Minister.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Titas Gas Field Casing Contractor Pipe Installation",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Pipeline protection contractor",
    location: "Vadughar, Brahmanbaria",
    capacity: '24" dia gas pipeline protection work',
    scopeOfWork:
      "Installation of casing contractor pipe to protect the 24 inch dia Titas Gas Field to AB Gas Pipeline under Ashuganj River Port-Sarail-Dharkhar-Akhaura Land Port Road 4-lane highway project.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "CDPL Meghna River HDD Associated Subcontractor Works",
    sector: Sector.OIL_GAS,
    client: "CPP",
    companyRole: "HDD subcontractor",
    location: "Meghna River",
    scopeOfWork:
      "HDD associated subcontractor works for transportation of oil through pipeline from Chattogram to Dhaka, Bangladesh Part-C, Meghna River 1 and 2.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Unique Meghnaghat 588.31 MW CCPP Fuel Gas Pipeline HDD",
    sector: Sector.POWER_SECTOR,
    client: "NEPC",
    companyRole: "HDD pipeline construction contractor",
    location: "Sonargaon, Narayanganj",
    capacity: '20" natural gas pipeline',
    scopeOfWork:
      "Construction of 20 inch natural gas pipeline by HDD method across the Meghna River and fuel gas pipeline outside the Unique Meghnaghat 588.31 MW CCPP power plant.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Titas Gas Field Wellhead Compressor Installation for BGFCL",
    sector: Sector.NG,
    client: "BGFCL",
    companyRole: "Bore piling, civil, electrical, HVAC and equipment installation contractor",
    location: "Titas Gas Field, Location-A",
    capacity: "7 compressors, each 60 MMSCFD",
    scopeOfWork:
      "Bore piling, civil works with electrical and HVAC system, plot plan, piping and equipment installation works of seven wellhead compressors with associated equipment and facilities.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Kalapur Gas Valve Station Interconnection",
    sector: Sector.NG,
    client: "JGTDSL",
    companyRole: "Valve station construction contractor",
    location: "Kalapur, Moulovi Bazar",
    scopeOfWork:
      "Construction of a valve station with interconnection between 14 inch dia gas field line and 6 inch dia JGTDSL line.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Titas Gas Field Wellhead Compressor Subcontract Works for SGCL",
    sector: Sector.NG,
    client: "SGCL",
    companyRole: "Subcontractor for civil, electrical, HVAC and mechanical works",
    location: "Titas Gas Field, Brahmanbaria",
    capacity: "7 compressors, each 60 MMSCFD",
    scopeOfWork:
      "Bore piling, civil works with electrical and HVAC system, plot plan, mechanical works, piping and equipment installation for seven wellhead compressors under BGFCL as subcontractor.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bottoil Kushtia 20 MMSCFD DRS and Hook-up Line",
    sector: Sector.NG,
    client: "SGCL",
    companyRole: "DRS and civil works contractor",
    location: "Bottoil, Kushtia",
    capacity: "20 MMSCFD DRS and 10 inch dia x 300 psig x 172 meter hook-up line",
    scopeOfWork:
      "Construction of 20 MMSCFD capacity DRS along with hook-up line and associated civil works at Bottoil, Kushtia.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "SASEC Elenga to Bangabandhu Bridge Gas Transmission Pipeline",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Pipeline construction contractor",
    location: "Elenga to east side of Bangabandhu Bridge",
    capacity: '2.36 km 30" OD x 100 psig and 1.3 km 24" OD x 1000 psig',
    scopeOfWork:
      "Construction of natural gas transmission pipeline with supply of related goods and services for widening of highway under SASEC Road Connectivity Project II.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bheramara-Khulna Gas Pipeline Protection at Aronghata",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Pipeline protection contractor",
    location: "Aronghata, Khulna",
    capacity: '20" high pressure gas pipeline',
    scopeOfWork:
      "Pipeline protection over Bheramara-Khulna high pressure gas pipeline for approach road construction under Khulna-Mongla Port Rail Line Construction Project.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "SGCL DRS to BSCIC Kushtia Gas Pipeline",
    sector: Sector.NG,
    client: "BRB",
    companyRole: "Gas pipeline construction contractor",
    location: "Kushtia",
    capacity: "8 inch dia x 140 psig x 2100 meter",
    scopeOfWork:
      "Construction of gas pipeline from SGCL DRS to BSCIC, Kushtia for supplying gas to BRB Cable Industries, MRS Industries, Kiam Metal Industries and BRB Energy.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bogura-Rangpur-Saidpur Gas Transmission Pipeline Section A",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Pipeline construction contractor",
    location: "Bogura to Boalmari, Shibganj",
    capacity: '30.50 km x 30" OD x 1000 psig',
    scopeOfWork:
      "Construction of gas transmission pipeline from Bogura TBS to Boalmari, Shibganj under Bogura-Rangpur-Saidpur Gas Transmission Pipeline Project, Section A.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Condensate Removal Emergency Maintenance in Distribution Pipeline",
    sector: Sector.NG,
    client: "SGCL",
    companyRole: "Emergency repair and maintenance contractor",
    location: "Bangladesh",
    scopeOfWork:
      "Emergency repair, maintenance and modification work for removal of condensate deposited in distribution pipeline.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Square Toiletries and Consumer Product RMS Construction",
    sector: Sector.NG,
    client: "SQUARE",
    companyRole: "Service, RMS and internal gas pipeline contractor",
    location: "Bangladesh",
    scopeOfWork:
      "Construction work of service, RMS and internal gas pipeline at captive power plant and materials supply for RMS construction of Square Toiletries Ltd. and Square Consumer Product Ltd.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "GTCL Bottoil TBS to SGCL DRS Pipeline",
    sector: Sector.NG,
    client: "SGCL",
    companyRole: "Pipeline testing and commissioning contractor",
    location: "Bottoil, Kushtia",
    capacity: '10" x 172 m x 300 psig',
    scopeOfWork:
      "Construction, testing and commissioning of pipeline from hook-up line from GTCL Bottoil TBS offtake to proposed SGCL DRS at Bottoil, Kushtia.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Adamji EPZ 20 inch Pipeline Emergency Maintenance",
    sector: Sector.NG,
    client: "TITAS",
    companyRole: "Emergency repair and maintenance contractor",
    location: "Adamji EPZ, Narayanganj",
    capacity: '20" dia x 1000 psig pipeline',
    scopeOfWork: "Emergency repair and maintenance of high pressure pipeline.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Padma Multipurpose Bridge Natural Gas Pipeline Works",
    sector: Sector.NG,
    client: "CPP",
    companyRole: "Fabrication, erection and installation contractor",
    location: "Padma Multipurpose Bridge",
    capacity: "762 mm OD natural gas transmission pipeline",
    scopeOfWork:
      "Fabrication, erection, installation, testing and commissioning of natural gas transmission pipelines and fixings/supports across Bangladesh Padma Multipurpose Bridge Project.",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "Dasherkandi WASA Gas Pipeline Rehabilitation",
    sector: Sector.NG,
    client: "TITAS",
    companyRole: "Pipeline rehabilitation contractor",
    location: "Hatirjheel near Rampura Bridge, Dhaka",
    capacity: '12" DN x 300 psig distribution main gas pipeline',
    scopeOfWork:
      "Rehabilitation of existing distribution main gas pipeline for Dasherkandi WASA Sewerage Treatment Project.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "SS Power Banshkhali Main Power House Underground Pipeline",
    sector: Sector.POWER_SECTOR,
    client: "SS Power",
    companyRole: "Underground pipeline installation contractor",
    location: "Banshkhali, Chattogram",
    capacity: "1320 MW coal fired power plant",
    scopeOfWork:
      "Underground pipeline installation of main power house of SS Power coal fired power plant.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Siddirganj and Horipur RMS Rectification and Modification",
    sector: Sector.NG,
    client: "Fernus Construction Company Inc.",
    companyRole: "RMS rectification and modification contractor",
    location: "Siddirganj and Horipur, Narayanganj",
    capacity: "200 MMSCFD Siddirganj RMS and 70 MMSCFD Horipur RMS",
    scopeOfWork:
      "Rectification and modification work of Siddirganj RMS and Horipur project.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chattogram CMS Fabrication Works",
    sector: Sector.NG,
    client: "KGDCL",
    companyRole: "Fabrication, erection and installation contractor",
    location: "Chattogram",
    capacity: "40 CMS units",
    scopeOfWork:
      "Fabrication, erection and installation works of forty customer metering station units.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Lakkatua to Hi-Tech RMS Pipeline and RMS Construction",
    sector: Sector.NG,
    client: "JGTDSL",
    companyRole: "Pipeline and RMS construction contractor",
    location: "Companygonj, Sylhet",
    capacity: '12" x 300 psig x 23 km',
    scopeOfWork:
      "Construction, testing and commissioning of pipeline from Lakkatua to Hi-Tech RMS and construction of Hi-Tech RMS.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "EPV Thakurgaon 115 MW Power Plant",
    sector: Sector.POWER_SECTOR,
    client: "Energypac Power Generation Company Ltd.",
    companyRole: "Contractor",
    location: "Thakurgaon",
    capacity: "115 MW",
    duration: "2 years 5 months",
    scopeOfWork:
      "Civil works of tank foundation, engine hall, control building, engine base foundation, boundary wall, building shed, miscellaneous and sanitary works, and fabrication and erection of tanks for the 115 MW power plant project at Thakurgaon.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chattogram 126 MW Power Plant",
    sector: Sector.POWER_SECTOR,
    client: "Anlima Energy Limited",
    companyRole: "Contractor",
    location: "Chattogram",
    capacity: "126 MW",
    duration: "1 year",
    scopeOfWork:
      "Civil works of tank foundation, pipe cape, pile making, driving and testing, materials supply, sanitary works, and fabrication and erection of tanks for the Chattogram power plant.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Anowara-Fouzdarhat 42 inch Gas Transmission Parallel Pipeline",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Gas transmission pipeline construction contractor",
    location: "Anowara-Fouzdarhat, Chattogram",
    capacity: '42" OD x 1000 psig',
    scopeOfWork: "Construction of gas transmission parallel pipeline.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Sheltech Ceramics Bhola Internal Gas Pipeline",
    sector: Sector.NG,
    client: "Sheltech Ceramics Ltd.",
    companyRole: "Internal gas pipeline erection contractor",
    location: "Bhola",
    scopeOfWork: "Erection of internal gas pipeline in plant area for 2nd and 3rd phase at Bhola.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "EPV Thakurgaon Tank Fabrication and Commissioning",
    sector: Sector.POWER_SECTOR,
    client: "GTCL",
    companyRole: "Fabrication, erection, installation, testing and commissioning contractor",
    location: "Thakurgaon",
    capacity: "16 tanks, 55 m3 to 5000 m3",
    scopeOfWork:
      "Fabrication, erection, installation, testing and commissioning works of sixteen tanks under Energy Pac Power Generation Limited at Thakurgaon.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Sheltech Ceramics Biiran River Pipeline Rehabilitation",
    sector: Sector.NG,
    client: "Sheltech Ceramics Ltd.",
    companyRole: "Pipeline rehabilitation contractor",
    location: "Gopalpur",
    capacity: '12" x 1000 psig transmission pipeline',
    scopeOfWork: "Rehabilitation works of transmission pipeline at Biiran River crossing.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Aggreko Bhola Existing Gas RMS Upgradation",
    sector: Sector.NG,
    client: "Aggreko International Projects Ltd.",
    companyRole: "Gas RMS upgradation contractor",
    location: "Bhola Island",
    scopeOfWork: "Upgradation of existing gas RMS at Aggreko Limited, Bhola Island.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Partex Petro Condensate Fractionation Plant Works",
    sector: Sector.PETROCHEMICAL,
    client: "Partex Petro Ltd.",
    companyRole: "Fabrication and erection contractor",
    location: "Anawara, Chittagong",
    capacity: "10,000 BPD",
    duration: "2 years",
    scopeOfWork:
      "Fabrication and erection of process equipment, piping, steel structure, electrical, instrumentation and control for Partex Petro Limited condensate fractionation plant.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Index LPG Fabrication Construction and Installation",
    sector: Sector.LPG,
    client: "INDEX LPG",
    companyRole: "Contractor",
    location: "Mongla",
    duration: "1 year",
    scopeOfWork: "Fabrication, construction and installation works for Index LPG at Mongla.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chevron MGF MB-A Gas Drilling Pad Development",
    sector: Sector.OIL_GAS,
    client: "CHEVRON",
    companyRole: "Sub-contractor",
    location: "Sreemongal, Moulvibazar",
    duration: "1 year",
    scopeOfWork: "Gas drilling pad development works of MGF (MB-A) under Chevron at Sreemongal, Moulvibazar.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Petromax Refinery Complex",
    sector: Sector.REFINERY,
    client: "Youth Group",
    companyRole: "Contractor",
    location: "Mongla",
    capacity: "2,500 BPD",
    duration: "1 year 3 months",
    scopeOfWork:
      "Mechanical fabrication, erection and painting of structures, fabrication, erection, hydrostatic testing and painting of piping, welding for CS, SS and alloy metal under RT, PWHT, PT, MT and hardness test coverage, and equipment installation, testing and commissioning of piping, fire hydrant, electrical and instrumentation works.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Faridpur 50 MW HFO Peaking Power Plant",
    sector: Sector.POWER_SECTOR,
    client: "Energypac Power Generation Company Ltd.",
    companyRole: "Sub-contractor",
    location: "Faridpur",
    capacity: "50 MW",
    duration: "1 year",
    scopeOfWork:
      "Fabrication and erection of chimney and structure with insulation, fabrication and erection of piping with hydro test and pickling, installation of valves, fine filter, flow meter and other appliances, tube and copper tracing, and fabrication and erection of charge air duct and exhaust gas duct with support structure.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "SGFL CRU Spherical Tank and Equipment Works",
    sector: Sector.NG,
    client: "SGCL",
    companyRole: "Erection, installation, testing and commissioning contractor",
    location: "Sylhet Gas Fields Limited",
    scopeOfWork:
      "Erection, installation, welding, testing, blasting and painting of piping works, erection and commissioning of two-unit spherical tank and equipment with electrical works for CRU of SGFL.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bakhrabad-Siddhirganj Pigging Assistance and Pig Cups Supply",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Pigging support and materials supplier",
    location: "Bakhrabad-Siddhirganj",
    capacity: '30" x 1000 psig x 60 km',
    scopeOfWork:
      "Supply of pig and cups with pigging assistance for Bakhrabad-Siddhirganj high pressure gas transmission pipeline pigging.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Ishwardi EPZ DRS Capacity Upgradation",
    sector: Sector.NG,
    client: "PGCL",
    companyRole: "DRS upgradation contractor",
    location: "Ishwardi EPZ",
    scopeOfWork:
      "Capacity upgradation of existing Ishwardi EPZ DRS of PGCL and associated works.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Moheshkhali 1500 MMSCFD Custody Transfer Metering Station",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Design, supply, installation and commissioning contractor",
    location: "Moheshkhali",
    capacity: "1500 MMSCFD CTMS",
    scopeOfWork:
      "Design, engineering, procurement and supply, installation, construction, testing, pre-commissioning and commissioning of custody transfer metering station under GTCL.",
    status: ProjectStatus.COMPLETED,
    featured: true,
  },
  {
    title: "Bakhrabad-Siddhirganj Polyurethane Conical Cup Supply",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Materials supplier",
    location: "Bakhrabad-Siddhirganj",
    capacity: '30" high pressure gas transmission pipeline',
    scopeOfWork:
      "Supply of four polyurethane conical cups against Bakhrabad-Siddhirganj high pressure gas transmission pipeline pigging.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bakhrabad Metering Station and Haripur RMS Emergency Maintenance",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Emergency maintenance contractor",
    location: "Bakhrabad Metering Station and Haripur RMS",
    scopeOfWork:
      "Emergency co-maintenance works for filter cartridge change at Bakhrabad Metering Station and ball valve replacement and spool fabrication for venting of natural gas from high pressure pipeline at Haripur RMS.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Rupsha 800 MW Combined Cycle Power Plant Pipeline",
    sector: Sector.POWER_SECTOR,
    client: "China Petroleum Pipeline Engineering Company Ltd.",
    companyRole: "Gas supply infrastructure contractor",
    location: "Rupsha, Khulna",
    capacity: "800 MW",
    duration: "1 year",
    scopeOfWork:
      "Procurement of plant-design, supply, installation, testing and commissioning of gas supply infrastructure of Rupsha 800 MW Combined Cycle Power Plant on turnkey basis.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bhola Dual Fuel Combined Cycle Power Plant",
    sector: Sector.POWER_SECTOR,
    client: "Bisho Infra Projects Ltd.",
    companyRole: "Power plant project contractor",
    location: "Bhola",
    capacity: "220 MW gas / 212 MW HSD",
    scopeOfWork: "Dual fuel combined cycle power plant project works at Bhola.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Sharishabari to Jamalpur Economic Zone Pipeline",
    sector: Sector.NG,
    client: "TITAS GAS",
    companyRole: "Pipeline construction contractor",
    location: "Sharishabari to Jamalpur Economic Zone",
    capacity: '16" DN x 140 psig x 10 km',
    scopeOfWork: "Pipeline from Sharishabari M&R Station to Jamalpur Economic Zone.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Nestle Bangladesh Materials Supply and Fabrication Works",
    sector: Sector.INFRASTRUCTURE,
    client: "Nestle Bangladesh Ltd.",
    companyRole: "Materials supplier and fabrication contractor",
    location: "Bangladesh",
    scopeOfWork: "Supply of materials and fabrication works.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Amin Bazar CGS Emergency Maintenance",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Emergency maintenance contractor",
    location: "Amin Bazar",
    scopeOfWork: "Emergency maintenance works for Amin Bazar CGS.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chittagong-Feni-Bahrabad Gas Transmission Parallel Pipeline Section F",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Gas transmission pipeline construction contractor",
    location: "Makarpur, NangalKote to Ghoshoa, Barura, Comilla",
    capacity: '20 km x 36" OD x 1000 psig',
    scopeOfWork:
      "Construction of high pressure natural gas transmission pipeline under Chittagong-Feni-Bahrabad Gas Transmission Parallel Pipeline Project, Section F.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Chattogram HP-DRS and IP-DRS Turn-key EPC Works",
    sector: Sector.NG,
    client: "KGDCL",
    companyRole: "Turn-key/EPC contractor",
    location: "Chattogram",
    scopeOfWork:
      "Design, supply, fabrication, installation, testing and commissioning of high-pressure district regulating station and intermediate pressure district regulating station in Chattogram.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Ashulia CGS Emergency Maintenance",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Emergency maintenance contractor",
    location: "Ashulia",
    scopeOfWork: "Emergency maintenance works for Ashulia CGS.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bonpara-Rajshahi High Pressure Gas Pipeline Maintenance at Hizli",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Repair and maintenance contractor",
    location: "Hizli Valve Station, Natore",
    capacity: '12.75" OD x 1000 psig',
    scopeOfWork:
      "Repair and maintenance works of Bonpara-Rajshahi high pressure gas transmission pipeline at Hizli Valve Station.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Sirajganj Dual Fuel Power Generator RMS and Gas Pipeline",
    sector: Sector.POWER_SECTOR,
    client: "Tiejun International (BD) Ltd.",
    companyRole: "RMS and gas pipeline installation contractor",
    location: "Sirajganj",
    capacity: "413.792 MW gas / 333.02 MW fuel oil",
    scopeOfWork:
      "Installation of RMS and gas pipeline of dual fuel fired power generator facility.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Anowara-Fouzdarhat Gas Transmission Pipeline Section D Lot 4",
    sector: Sector.NG,
    client: "GTCL",
    companyRole: "Gas transmission pipeline construction contractor",
    location: "North Halishahar to Uttar Salimpur Pig Receiver Station",
    capacity: '42" OD x 1000 psig, approx. 7.20 km',
    scopeOfWork:
      "Construction of gas transmission pipeline under Anowara-Fouzdarhat Gas Transmission Pipeline Project, Section-D/Lot-4.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Bonpara Gas Manifold Station Pressure Reducing Stream Modification",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Bonpara, Natore",
    duration: "1 month",
    scopeOfWork:
      "Modification, hook-up and commissioning of pressure reducing stream at Bonpara Gas Manifold Station, Bonpara, Natore.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Rajshahi Temporary RMS Relocation to Ishwardi TBS",
    sector: Sector.NG,
    client: "Gas Transmission Company Ltd. (GTCL)",
    companyRole: "Contractor",
    location: "Rajshahi and Ishwardi",
    duration: "40 days",
    scopeOfWork:
      "Dismantling and carrying of existing temporary regulating and metering station from Rajshahi to Ishwardi Town Border Station and installation, hook-up and commissioning of the RMS at Ishwardi TBS.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Dhamkura Rajshahi Main Distribution Gas Pipeline",
    sector: Sector.NG,
    client: "Pashchimanchal Gas Company Limited (PGCL)",
    companyRole: "Contractor",
    location: "Dhamkura, Pabna, Rajshahi",
    capacity: '8" dia x 140 psig x 3900 meter',
    duration: "4 months",
    scopeOfWork:
      "Construction of main distribution gas pipeline from existing 8 inch gas off-take at Horogram Natunpara mour to proposed ACI Agrovate Pvt. Ltd. yard at Dhamkura, along Rajshahi-Chapainwabganj bypass highway.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Godnail 100 MMSCFD Town Border Station",
    sector: Sector.NG,
    client: "TITAS Gas Transmission & Distribution Co. Ltd.",
    companyRole: "Contractor",
    location: "Godnail, Narayanganj",
    capacity: "100 MMSCFD",
    duration: "4 months",
    scopeOfWork:
      "Fabrication, erection and installation of a standard Town Border Station with inlet pressure 16 inch dia x 300 psig and outlet pressure 12 inch dia x 150 psig under Titas Gas franchise area.",
    status: ProjectStatus.COMPLETED,
  },
];

async function main() {
  const removedOldSeedProjects = await prisma.project.deleteMany({
    where: {
      slug: {
        in: [
          "42-inch-meghna-asharia-and-menikhal-river-hdd-works",
        ],
      },
    },
  });

  for (const project of projects) {
    const slug = slugify(project.title);

    await prisma.project.upsert({
      where: { slug },
      update: {
        ...project,
        slug,
      },
      create: {
        ...project,
        slug,
      },
    });
  }

  const counts = projects.reduce(
    (acc, project) => {
      acc[project.status] += 1;
      return acc;
    },
    {
      [ProjectStatus.COMPLETED]: 0,
      [ProjectStatus.ONGOING]: 0,
      [ProjectStatus.UPCOMING]: 0,
    },
  );

  console.log(
    `Seeded ${projects.length} brochure projects (${counts.COMPLETED} completed, ${counts.ONGOING} ongoing, ${counts.UPCOMING} upcoming). Deleted ${removedOldSeedProjects.count} old seed project(s).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
