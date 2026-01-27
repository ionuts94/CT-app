import { envs } from "@/constants/envs";
import { createClient } from "@/lib/supabase/server";
import { httpPost } from "@/sdk/http";
import ContractService from "../contracts";

export async function generateContractPdf({ contractId }: { contractId: string }) {
    const supabase = await createClient()
    const contract = await ContractService.getContractWithCompanyAndOwner({ contractId })

    console.log("contract content")
    console.log(contract.currentVersionContent.content)

    const response = await fetch(
        "https://pdf.pactly.co.uk/pdf/generate",
        {
            method: "POST",
            headers: {
                "x-internal-token": envs.INTERNAL_TOKEN!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractId: "2498c1b9-9578-4870-b81c-eaa2edb86f24",
                html: contract.currentVersionContent.content
            })
        }
    )

    const responseJson = await response.json()
    console.log(responseJson)
}