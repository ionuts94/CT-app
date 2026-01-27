import { envs } from "@/constants/envs";
import ContractService from "../contracts";

export async function generateContractPdf({ contractId }: { contractId: string }): Promise<{ contractPdfUrl: string }> {

    const contract = await ContractService.getContractWithCompanyAndOwner({ contractId })

    const response = await fetch(
        "https://pdf.pactly.co.uk/pdf/generate",
        {
            method: "POST",
            headers: {
                "x-internal-token": envs.INTERNAL_TOKEN!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractId: contractId,
                html: contract.currentVersionContent.content
            })
        }
    )

    const responseJson = await response.json()
    return {
        contractPdfUrl: responseJson.contractPdfUrl
    }

}