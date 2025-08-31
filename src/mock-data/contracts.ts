import { CircleAlert, Hourglass, Send, Signature } from "lucide-react";

export const KPI_CONTRACTS_DATA = [
  {
    label: "Contracte Trimise",
    icon: Send,
    value: 128,
    hint: "Luna asta"
  },
  {
    label: "Contracte Semnate",
    icon: Signature,
    value: 76,
    hint: "12% vs ultima luna"
  },
  {
    label: "Contracts Pending",
    icon: Hourglass,
    value: 34,
    hint: "Medie in pending: 3 zile"
  },
  {
    label: "Contracte Expirate",
    icon: CircleAlert,
    value: 6,
    hint: "Necesita atentie"
  },

] as const

type ContractStatus = "DRAFT" | "PENDING" | "SIGNED" | "DECLINED" | "EXPIRED"

interface MockContract {
  firstName: string
  lastName: string
  contractTitle: string
  status: ContractStatus
  date: string
}

export const MOCK_CONTRACTS: MockContract[] = [
  { firstName: "Ion", lastName: "Popescu", contractTitle: "Contract Prestări Servicii Web", status: "PENDING", date: "2025-08-01" },
  { firstName: "Maria", lastName: "Ionescu", contractTitle: "Contract Design Grafic", status: "SIGNED", date: "2025-07-28" },
  { firstName: "Andrei", lastName: "Dumitrescu", contractTitle: "Contract Consultanță IT", status: "DRAFT", date: "2025-07-20" },
  { firstName: "Elena", lastName: "Stan", contractTitle: "Contract Marketing Digital", status: "DECLINED", date: "2025-07-19" },
  { firstName: "Radu", lastName: "Georgescu", contractTitle: "Contract Fotografie Eveniment", status: "SIGNED", date: "2025-07-15" },
  { firstName: "Cristina", lastName: "Popa", contractTitle: "Contract Traduceri Documente", status: "EXPIRED", date: "2025-07-10" },
  { firstName: "Mihai", lastName: "Iliescu", contractTitle: "Contract Servicii Contabile", status: "PENDING", date: "2025-07-05" },
  { firstName: "Ana", lastName: "Rusu", contractTitle: "Contract Design UX/UI", status: "SIGNED", date: "2025-07-01" },
  { firstName: "Victor", lastName: "Marin", contractTitle: "Contract Mentenanță Software", status: "DRAFT", date: "2025-06-28" },
  { firstName: "Gabriela", lastName: "Tudor", contractTitle: "Contract Video Editing", status: "SIGNED", date: "2025-06-25" },
  { firstName: "Paul", lastName: "Savu", contractTitle: "Contract Consultanță Fiscală", status: "SIGNED", date: "2025-06-20" },
  { firstName: "Irina", lastName: "Lungu", contractTitle: "Contract Copywriting", status: "PENDING", date: "2025-06-18" },
  { firstName: "Ovidiu", lastName: "Barbu", contractTitle: "Contract SEO Optimization", status: "DECLINED", date: "2025-06-15" },
  { firstName: "Raluca", lastName: "Petrescu", contractTitle: "Contract Training HR", status: "DRAFT", date: "2025-06-12" },
  { firstName: "George", lastName: "Stancu", contractTitle: "Contract Evenimente Corporate", status: "SIGNED", date: "2025-06-10" },
  { firstName: "Florin", lastName: "Enache", contractTitle: "Contract Avocatură", status: "EXPIRED", date: "2025-06-05" },
  { firstName: "Diana", lastName: "Dobre", contractTitle: "Contract PR Services", status: "SIGNED", date: "2025-06-02" },
  { firstName: "Cătălin", lastName: "Oprea", contractTitle: "Contract Software Development", status: "PENDING", date: "2025-05-28" },
  { firstName: "Bianca", lastName: "Costache", contractTitle: "Contract Social Media Management", status: "DRAFT", date: "2025-05-25" },
  { firstName: "Laurențiu", lastName: "Sima", contractTitle: "Contract Consultanță GDPR", status: "SIGNED", date: "2025-05-20" },
  { firstName: "Mona", lastName: "Ciobanu", contractTitle: "Contract Organizare Evenimente", status: "PENDING", date: "2025-05-15" },
  { firstName: "Dan", lastName: "Avram", contractTitle: "Contract Logistică", status: "SIGNED", date: "2025-05-12" },
  { firstName: "Sorina", lastName: "Badea", contractTitle: "Contract Arhitectură", status: "DRAFT", date: "2025-05-10" },
  { firstName: "Adrian", lastName: "Călin", contractTitle: "Contract Publicitate Online", status: "EXPIRED", date: "2025-05-05" },
  { firstName: "Mirela", lastName: "Matei", contractTitle: "Contract Consultanță Financiară", status: "SIGNED", date: "2025-05-01" },
  { firstName: "Alexandru", lastName: "Nistor", contractTitle: "Contract Mentenanță IT", status: "PENDING", date: "2025-04-28" },
  { firstName: "Camelia", lastName: "Voicu", contractTitle: "Contract Consultanță Juridică", status: "SIGNED", date: "2025-04-25" },
  { firstName: "Eugen", lastName: "Manole", contractTitle: "Contract Freelance Developer", status: "DRAFT", date: "2025-04-20" },
  { firstName: "Georgiana", lastName: "Neagu", contractTitle: "Contract Consultanță Imobiliară", status: "SIGNED", date: "2025-04-18" },
  { firstName: "Cosmin", lastName: "Damian", contractTitle: "Contract Servicii Foto", status: "DECLINED", date: "2025-04-15" },
  { firstName: "Mihaela", lastName: "Apostol", contractTitle: "Contract Copy Editing", status: "SIGNED", date: "2025-04-12" },
  { firstName: "Ilie", lastName: "Popa", contractTitle: "Contract Training Sales", status: "PENDING", date: "2025-04-10" },
  { firstName: "Alexandra", lastName: "Chiriac", contractTitle: "Contract Branding Services", status: "SIGNED", date: "2025-04-05" },
  { firstName: "Valentin", lastName: "Nedelea", contractTitle: "Contract Web Hosting", status: "EXPIRED", date: "2025-04-01" },
  { firstName: "Cristian", lastName: "Filip", contractTitle: "Contract Consultanță HR", status: "DRAFT", date: "2025-03-28" },
  { firstName: "Simona", lastName: "Dragomir", contractTitle: "Contract Graphic Design", status: "SIGNED", date: "2025-03-25" },
  { firstName: "Dragoș", lastName: "Munteanu", contractTitle: "Contract Mobile App Development", status: "PENDING", date: "2025-03-20" },
  { firstName: "Raluca", lastName: "Marcu", contractTitle: "Contract Legal Advisory", status: "SIGNED", date: "2025-03-18" },
  { firstName: "Sebastian", lastName: "Rădulescu", contractTitle: "Contract Research", status: "DECLINED", date: "2025-03-15" },
  { firstName: "Oana", lastName: "Voinea", contractTitle: "Contract Customer Support", status: "SIGNED", date: "2025-03-12" },
  { firstName: "Dorel", lastName: "Ganea", contractTitle: "Contract UX Audit", status: "DRAFT", date: "2025-03-10" },
  { firstName: "Anca", lastName: "Teodorescu", contractTitle: "Contract App Maintenance", status: "SIGNED", date: "2025-03-05" },
  { firstName: "Liviu", lastName: "Mihăilescu", contractTitle: "Contract Content Writing", status: "PENDING", date: "2025-03-01" },
  { firstName: "Claudia", lastName: "Marinescu", contractTitle: "Contract Branding Consulting", status: "SIGNED", date: "2025-02-28" },
  { firstName: "Petru", lastName: "Cojocaru", contractTitle: "Contract Translation Services", status: "EXPIRED", date: "2025-02-25" },
  { firstName: "Alina", lastName: "Cristea", contractTitle: "Contract Video Production", status: "SIGNED", date: "2025-02-20" },
  { firstName: "Ștefan", lastName: "Voicu", contractTitle: "Contract Event Planning", status: "PENDING", date: "2025-02-15" },
  { firstName: "Nicoleta", lastName: "Lazăr", contractTitle: "Contract Legal Representation", status: "DRAFT", date: "2025-02-10" },
  { firstName: "Marius", lastName: "Preda", contractTitle: "Contract Business Consulting", status: "SIGNED", date: "2025-02-05" },
  { firstName: "Laura", lastName: "Sorin", contractTitle: "Contract Audit Financiar", status: "SIGNED", date: "2025-02-01" },
  { firstName: "Octavian", lastName: "Cernat", contractTitle: "Contract PR Campaign", status: "PENDING", date: "2025-01-28" },
]
