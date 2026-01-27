import { ContractViewSignatures } from "../view-contract/components/contract-view-signatures"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import ContractService from "@/services/contracts"

type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function GenerateContractPage({ searchParams }: Props) {
  const { c } = await searchParams
  const { data } = await withSafeService(() =>
    ContractService.getSenderContract({ contractId: c })
  )

  const contentHtml = data?.currentVersion?.content
    ?.toString()
    .replace(/<p>(<br\s*\/?>)?<\/p>/g, "<p>&nbsp;</p>")

  if (!data) return null

  return (
    <>
      {/* 🔑 FIX PDF BACKGROUND */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <style>{`
        html, body {
          background: #ffffff !important;
          font-family: "Inter" !important, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        strong, b {
          font-weight: 600;
        }

        .pdf-force-white,
        .pdf-force-white * {
          background: #ffffff !important;
        }
      `}</style>

      <div className="w-full bg-white pdf-force-white">
        <div className="overflow-y-auto bg-white max-w-[840px] mx-auto h-full flex flex-col flex-1 pdf-force-white">
          <div
            className="break-words whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: contentHtml as any }}
          />
          <div className="pdf-force-white">
            <ContractViewSignatures contract={data} />
          </div>
        </div>
      </div>
    </>
  )
}
