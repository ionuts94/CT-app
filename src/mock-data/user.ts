export const userMockData = {
  id: "usr_ck2l9x8yz001", // cuid()
  email: "ion.popescu@example.com",
  firstName: "Ion",
  lastName: "Popescu",
  phone: "+40721234567",
  age: 32,

  currentCompanyId: "cmp_ab12cd34ef56",
  currentCompany: {
    id: "cmp_ab12cd34ef56",
    name: "Acme SRL",
    cui: "RO12345678",
    regNumber: "J40/1234/2022",
    emailDomain: "acme.com",
    logoUrl: "https://placehold.co/200x200?text=ACME",
    colorPrimary: "#1E88E5",
    colorSecondary: "#42A5F5",
    colorAccent: "#90CAF9",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-05-10T15:30:00Z"),
  },

  createdAt: new Date("2024-01-01T10:00:00Z"),
  updatedAt: new Date("2024-05-10T15:30:00Z"),

  memberships: [
    {
      id: "mbr_01",
      userId: "usr_ck2l9x8yz001",
      companyId: "cmp_ab12cd34ef56",
      roleKey: "OWNER",
      createdAt: new Date("2024-01-01T10:00:00Z"),
    },
  ],

  roles: [
    {
      id: "role_01",
      name: "Founder",
      description: "Full access",
      permissions: { canCreateContracts: true, canInvite: true },
      companyId: "cmp_ab12cd34ef56",
    },
  ],

  contracts: [
    {
      id: "ctr_01",
      title: "Contract Servicii Foto",
      content: { body: "Lorem ipsum..." },
      status: "PENDING",
      ownerId: "usr_ck2l9x8yz001",
      companyId: "cmp_ab12cd34ef56",
      createdAt: new Date("2024-05-01T12:00:00Z"),
      updatedAt: new Date("2024-05-15T12:00:00Z"),
    },
  ],

  signatures: [
    {
      id: "sig_01",
      type: "DRAW",
      fullName: "Ion Popescu",
      title: "Founder",
      imageUrl: "https://placehold.co/300x100?text=SIGNATURE",
      createdAt: new Date("2024-05-15T13:00:00Z"),
      userId: "usr_ck2l9x8yz001",
      contractId: "ctr_01",
    },
  ],

  invoices: [
    {
      id: "inv_01",
      number: "INV-2024-001",
      date: new Date("2024-05-20"),
      amount: 99.99,
      status: "PAID",
      pdfUrl: "https://placehold.co/600x800?text=Invoice",
      userId: "usr_ck2l9x8yz001",
      companyId: "cmp_ab12cd34ef56",
    },
  ],

  comments: [
    {
      id: "cmt_01",
      content: "Looks good to me 👍",
      createdAt: new Date("2024-05-15T14:00:00Z"),
      userId: "usr_ck2l9x8yz001",
      contractId: "ctr_01",
    },
  ],

  activities: [
    {
      id: "act_01",
      action: "CREATED",
      createdAt: new Date("2024-05-01T12:00:00Z"),
      userId: "usr_ck2l9x8yz001",
      contractId: "ctr_01",
      meta: { ip: "192.168.0.1" },
    },
  ],

  templates: [
    {
      id: "tpl_01",
      name: "NDA Standard",
      category: "Legal",
      tags: ["NDA", "Confidentiality"],
      content: { body: "This is a template..." },
      updatedAt: new Date("2024-05-10T09:00:00Z"),
      createdAt: new Date("2024-05-01T09:00:00Z"),
      companyId: "cmp_ab12cd34ef56",
      creatorId: "usr_ck2l9x8yz001",
    },
  ],
} as const