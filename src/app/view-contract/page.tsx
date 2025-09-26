import { FreeGetContractWithCompany, GetContractWithCompany } from "@/actions/post/contracts"

type Props = {
    searchParams: Promise<{ c: string }>
}
export default async function ViewContractPage({ searchParams }: Props) {
    const { c } = await searchParams

    const { data, error } = await FreeGetContractWithCompany({ contractId: c })

    console.log("error")

    console.log(error)

    console.log(data)

    return (
        <main>

        </main>
    )
}