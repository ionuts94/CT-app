import { FreeGetViewContract } from "@/actions/post/contracts"
import { ContractViewSignatures } from "../view-contract/components/contract-view-signatures"

type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function GenerateContractPage({ searchParams }: Props) {
  const { c } = await searchParams
  const { data } = await FreeGetViewContract({ contractId: c })
  const contentHtml = data?.currentVersion?.content?.toString().replace(/<p>(<br\s*\/?>)?<\/p>/g, '<p>&nbsp;</p>');

  if (!data) return null;

  return (
    <div className="w-full bg-white">
      <div className="overflow-y-auto bg-white max-w-[840px] mx-auto h-full flex flex-col flex-1">
        <div className="break-words whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: contentHtml as any }} />
        <ContractViewSignatures contract={data} />
      </div>
    </div>
  )
}