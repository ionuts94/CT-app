"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ai nevoie de cheia cu acces full
)

async function main() {
    // 1. Company
    const { data: company, error: companyError } = await supabase
        .from("Company")
        .insert([
            {
                name: "Contract Transparent SRL",
                cui: "RO12345678",
                regNumber: "J40/1234/2025",
                emailDomain: "contracttransparent.ro",
                logoUrl: "https://placehold.co/200x200",
                colorPrimary: "#1D4ED8",
                colorSecondary: "#9333EA",
                colorAccent: "#F59E0B"
            }
        ])
        .select()
        .single()

    if (companyError) throw companyError
    console.log("✅ Company created:", company)

    // 2. Roles
    const { data: roles, error: roleError } = await supabase
        .from("Role")
        .insert([
            { name: "Founder", description: "Full access", companyId: company.id },
            { name: "Admin", description: "Manage contracts and users", companyId: company.id },
            { name: "Member", description: "Limited access", companyId: company.id }
        ])
        .select()

    if (roleError) throw roleError
    console.log("✅ Roles created:", roles)

    const founderRole = roles.find((r: any) => r.name === "Founder")

    // 3. User
    const { data: user, error: userError } = await supabase
        .from("User")
        .insert([
            {
                email: "demo@contracttransparent.ro",
                firstName: "Ionut",
                lastName: "Founder",
                roleId: founderRole.id,
                companyId: company.id,
                age: 30
            }
        ])
        .select()
        .single()

    if (userError) throw userError
    console.log("✅ User created:", user)

    // 4. Template
    const { data: template, error: templateError } = await supabase
        .from("Template")
        .insert([
            {
                name: "Contract Prestari Servicii",
                category: "General",
                tags: ["servicii", "prestari"],
                content: "Acest contract este un demo de prestari servicii...",
                companyId: company.id,
                creatorId: user.id
            }
        ])
        .select()
        .single()

    if (templateError) throw templateError
    console.log("✅ Template created:", template)

    // 5. Contract
    const { data: contract, error: contractError } = await supabase
        .from("Contract")
        .insert([
            {
                title: "Contract Servicii Foto Nunta",
                content: "Continut contract demo...",
                status: "PENDING",
                ownerId: user.id,
                companyId: company.id
            }
        ])
        .select()
        .single()

    if (contractError) throw contractError
    console.log("✅ Contract created:", contract)

    // 6. Signature
    const { data: signature, error: sigError } = await supabase
        .from("Signature")
        .insert([
            {
                type: "TYPE",
                fullName: `${user.firstName} ${user.lastName}`,
                title: "Founder",
                userId: user.id,
                contractId: contract.id
            }
        ])
        .select()
        .single()

    if (sigError) throw sigError
    console.log("✅ Signature created:", signature)

    // 7. Comment
    const { data: comment, error: commentError } = await supabase
        .from("Comment")
        .insert([
            {
                content: "Te rog verifică clauza de plată.",
                userId: user.id,
                contractId: contract.id
            }
        ])
        .select()
        .single()

    if (commentError) throw commentError
    console.log("✅ Comment created:", comment)

    // 8. Activity
    const { data: activity, error: activityError } = await supabase
        .from("Activity")
        .insert([
            {
                action: "CONTRACT_CREATED",
                userId: user.id,
                contractId: contract.id
            }
        ])
        .select()
        .single()

    if (activityError) throw activityError
    console.log("✅ Activity created:", activity)
}