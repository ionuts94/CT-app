export type Template = {
  title: string
  updatedAt: string
  lastUsedAt: string
  usedCount: number
  content: string
}

export const MOCK_TEMPLATES: Template[] = [
  {
    title: "IT Services Agreement",
    updatedAt: "2025-08-01",
    lastUsedAt: "2025-08-15",
    usedCount: 12,
    content: "<h1>IT Services Agreement</h1><p>This agreement governs the provision of IT services...</p>"
  },
  {
    title: "Graphic Design Agreement",
    updatedAt: "2025-07-20",
    lastUsedAt: "2025-08-10",
    usedCount: 8,
    content: "<h1>Graphic Design Agreement</h1><p>Definitions, terms, and deliverables...</p>"
  },
  {
    title: "Financial Consulting Agreement",
    updatedAt: "2025-07-10",
    lastUsedAt: "2025-08-05",
    usedCount: 6,
    content: "<h1>Financial Consulting Agreement</h1><p>Provisions related to fees and confidentiality...</p>"
  },
  {
    title: "Event Photography Agreement",
    updatedAt: "2025-07-01",
    lastUsedAt: "2025-07-29",
    usedCount: 14,
    content: "<h1>Event Photography Agreement</h1><p>Details about photo sessions and delivery of materials...</p>"
  },
  {
    title: "Document Translation Agreement",
    updatedAt: "2025-06-28",
    lastUsedAt: "2025-07-20",
    usedCount: 9,
    content: "<h1>Document Translation Agreement</h1><p>Clauses regarding delivery terms and quality...</p>"
  },
  {
    title: "Legal Services Agreement",
    updatedAt: "2025-06-15",
    lastUsedAt: "2025-07-12",
    usedCount: 11,
    content: "<h1>Legal Services Agreement</h1><p>Details about legal representation and fees...</p>"
  },
  {
    title: "Social Media Management Agreement",
    updatedAt: "2025-06-01",
    lastUsedAt: "2025-07-01",
    usedCount: 7,
    content: "<h1>Social Media Management Agreement</h1><p>Provisions for content creation and post scheduling...</p>"
  },
  {
    title: "Event Planning Agreement",
    updatedAt: "2025-05-25",
    lastUsedAt: "2025-06-30",
    usedCount: 10,
    content: "<h1>Event Planning Agreement</h1><p>Included services: logistics, staffing, venue...</p>"
  },
  {
    title: "Legal Consulting Agreement",
    updatedAt: "2025-05-10",
    lastUsedAt: "2025-06-20",
    usedCount: 5,
    content: "<h1>Legal Consulting Agreement</h1><p>Clauses related to protecting the client’s interests...</p>"
  },
  {
    title: "Software Maintenance Agreement",
    updatedAt: "2025-05-01",
    lastUsedAt: "2025-06-15",
    usedCount: 13,
    content: "<h1>Software Maintenance Agreement</h1><p>Update services, patches, and technical support...</p>"
  },

]
