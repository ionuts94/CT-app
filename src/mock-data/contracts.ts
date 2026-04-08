import { CircleAlert, Hourglass, Send, Signature } from "lucide-react";

export const KPI_CONTRACTS_DATA = [
  {
    label: "Contracts Sent",
    icon: Send,
    value: 128,
    hint: "This month"
  },
  {
    label: "Contracts Signed",
    icon: Signature,
    value: 76,
    hint: "12% vs last month"
  },
  {
    label: "Contracts Pending",
    icon: Hourglass,
    value: 34,
    hint: "Average time pending: 3 days"
  },
  {
    label: "Expired Contracts",
    icon: CircleAlert,
    value: 6,
    hint: "Needs attention"
  },

] as const

type ContractStatus = "DRAFT" | "PENDING" | "SIGNED" | "DECLINED" | "EXPIRED"

interface MockContract {
  firstName: string
  lastName: string
  title: string
  status: ContractStatus
  date: string
}

export const MOCK_CONTRACTS: MockContract[] = [
  { firstName: "Ion", lastName: "Popescu", title: "Web Services Agreement", status: "PENDING", date: "2025-08-01" },
  { firstName: "Maria", lastName: "Ionescu", title: "Graphic Design Agreement", status: "SIGNED", date: "2025-07-28" },
  { firstName: "Andrei", lastName: "Dumitrescu", title: "IT Consulting Agreement", status: "DRAFT", date: "2025-07-20" },
  { firstName: "Elena", lastName: "Stan", title: "Digital Marketing Agreement", status: "DECLINED", date: "2025-07-19" },
  { firstName: "Radu", lastName: "Georgescu", title: "Event Photography Agreement", status: "SIGNED", date: "2025-07-15" },
  { firstName: "Cristina", lastName: "Popa", title: "Document Translation Agreement", status: "EXPIRED", date: "2025-07-10" },
  { firstName: "Mihai", lastName: "Iliescu", title: "Accounting Services Agreement", status: "PENDING", date: "2025-07-05" },
  { firstName: "Ana", lastName: "Rusu", title: "UX/UI Design Agreement", status: "SIGNED", date: "2025-07-01" },
  { firstName: "Victor", lastName: "Marin", title: "Software Maintenance Agreement", status: "DRAFT", date: "2025-06-28" },
  { firstName: "Gabriela", lastName: "Tudor", title: "Video Editing Agreement", status: "SIGNED", date: "2025-06-25" },
  { firstName: "Paul", lastName: "Savu", title: "Tax Consulting Agreement", status: "SIGNED", date: "2025-06-20" },
  { firstName: "Irina", lastName: "Lungu", title: "Copywriting Agreement", status: "PENDING", date: "2025-06-18" },
  { firstName: "Ovidiu", lastName: "Barbu", title: "SEO Optimization Agreement", status: "DECLINED", date: "2025-06-15" },
  { firstName: "Raluca", lastName: "Petrescu", title: "HR Training Agreement", status: "DRAFT", date: "2025-06-12" },
  { firstName: "George", lastName: "Stancu", title: "Corporate Events Agreement", status: "SIGNED", date: "2025-06-10" },
  { firstName: "Florin", lastName: "Enache", title: "Legal Services Agreement", status: "EXPIRED", date: "2025-06-05" },
  { firstName: "Diana", lastName: "Dobre", title: "PR Services Agreement", status: "SIGNED", date: "2025-06-02" },
  { firstName: "Cătălin", lastName: "Oprea", title: "Software Development Agreement", status: "PENDING", date: "2025-05-28" },
  { firstName: "Bianca", lastName: "Costache", title: "Social Media Management Agreement", status: "DRAFT", date: "2025-05-25" },
  { firstName: "Laurențiu", lastName: "Sima", title: "GDPR Consulting Agreement", status: "SIGNED", date: "2025-05-20" },
  { firstName: "Mona", lastName: "Ciobanu", title: "Event Planning Agreement", status: "PENDING", date: "2025-05-15" },
  { firstName: "Dan", lastName: "Avram", title: "Logistics Agreement", status: "SIGNED", date: "2025-05-12" },
  { firstName: "Sorina", lastName: "Badea", title: "Architecture Agreement", status: "DRAFT", date: "2025-05-10" },
  { firstName: "Adrian", lastName: "Călin", title: "Online Advertising Agreement", status: "EXPIRED", date: "2025-05-05" },
  { firstName: "Mirela", lastName: "Matei", title: "Financial Consulting Agreement", status: "SIGNED", date: "2025-05-01" },
  { firstName: "Alexandru", lastName: "Nistor", title: "IT Maintenance Agreement", status: "PENDING", date: "2025-04-28" },
  { firstName: "Camelia", lastName: "Voicu", title: "Legal Consulting Agreement", status: "SIGNED", date: "2025-04-25" },
  { firstName: "Eugen", lastName: "Manole", title: "Freelance Developer Agreement", status: "DRAFT", date: "2025-04-20" },
  { firstName: "Georgiana", lastName: "Neagu", title: "Real Estate Consulting Agreement", status: "SIGNED", date: "2025-04-18" },
  { firstName: "Cosmin", lastName: "Damian", title: "Photography Services Agreement", status: "DECLINED", date: "2025-04-15" },
  { firstName: "Mihaela", lastName: "Apostol", title: "Copy Editing Agreement", status: "SIGNED", date: "2025-04-12" },
  { firstName: "Ilie", lastName: "Popa", title: "Sales Training Agreement", status: "PENDING", date: "2025-04-10" },
  { firstName: "Alexandra", lastName: "Chiriac", title: "Branding Services Agreement", status: "SIGNED", date: "2025-04-05" },
  { firstName: "Valentin", lastName: "Nedelea", title: "Web Hosting Agreement", status: "EXPIRED", date: "2025-04-01" },
  { firstName: "Cristian", lastName: "Filip", title: "HR Consulting Agreement", status: "DRAFT", date: "2025-03-28" },
  { firstName: "Simona", lastName: "Dragomir", title: "Graphic Design Agreement", status: "SIGNED", date: "2025-03-25" },
  { firstName: "Dragoș", lastName: "Munteanu", title: "Mobile App Development Agreement", status: "PENDING", date: "2025-03-20" },
  { firstName: "Raluca", lastName: "Marcu", title: "Legal Advisory Agreement", status: "SIGNED", date: "2025-03-18" },
  { firstName: "Sebastian", lastName: "Rădulescu", title: "Research Agreement", status: "DECLINED", date: "2025-03-15" },
  { firstName: "Oana", lastName: "Voinea", title: "Customer Support Agreement", status: "SIGNED", date: "2025-03-12" },
  { firstName: "Dorel", lastName: "Ganea", title: "UX Audit Agreement", status: "DRAFT", date: "2025-03-10" },
  { firstName: "Anca", lastName: "Teodorescu", title: "App Maintenance Agreement", status: "SIGNED", date: "2025-03-05" },
  { firstName: "Liviu", lastName: "Mihăilescu", title: "Content Writing Agreement", status: "PENDING", date: "2025-03-01" },
  { firstName: "Claudia", lastName: "Marinescu", title: "Branding Consulting Agreement", status: "SIGNED", date: "2025-02-28" },
  { firstName: "Petru", lastName: "Cojocaru", title: "Translation Services Agreement", status: "EXPIRED", date: "2025-02-25" },
  { firstName: "Alina", lastName: "Cristea", title: "Video Production Agreement", status: "SIGNED", date: "2025-02-20" },
  { firstName: "Ștefan", lastName: "Voicu", title: "Event Planning Agreement", status: "PENDING", date: "2025-02-15" },
  { firstName: "Nicoleta", lastName: "Lazăr", title: "Legal Representation Agreement", status: "DRAFT", date: "2025-02-10" },
  { firstName: "Marius", lastName: "Preda", title: "Business Consulting Agreement", status: "SIGNED", date: "2025-02-05" },
  { firstName: "Laura", lastName: "Sorin", title: "Financial Audit Agreement", status: "SIGNED", date: "2025-02-01" },
  { firstName: "Octavian", lastName: "Cernat", title: "PR Campaign Agreement", status: "PENDING", date: "2025-01-28" },
]
