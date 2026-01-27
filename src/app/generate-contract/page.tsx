import ContractService from "@/services/contracts"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import { ContractViewSignatures } from "../view-contract/components/contract-view-signatures"
import Head from "next/head"

type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function GenerateContractPdfPage({ searchParams }: Props) {
  const { c } = await searchParams

  const { data } = await withSafeService(() =>
    ContractService.getSenderContract({ contractId: c })
  )

  if (!data) return null

  const rawHtml = data.currentVersion?.content?.toString() ?? ""

  const normalizedHtml = rawHtml
    .replace(/<p>\s*<\/p>/g, '<p class="pdf-spacer">&nbsp;</p>')
    .replace(/<p><br\s*\/?><\/p>/g, '<p class="pdf-spacer">&nbsp;</p>')

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .pdf-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 32px;
            font-family: Arial, serif;
            font-size: 14px;
            line-height: 1.6;
            color: #111;
          }

          p {
            margin: 0 0 12px 0;
            page-break-inside: avoid;
          }

          .pdf-spacer {
            margin-bottom: 16px;
          }

          h1, h2, h3 {
            margin-top: 24px;
            margin-bottom: 12px;
            page-break-after: avoid;
          }

          .signatures {
            margin-top: 48px;
            page-break-inside: avoid;
          }
        `}</style>
      </Head>


      <div className="pdf-page">
        <div dangerouslySetInnerHTML={{ __html: normalizedHtml }} />
        <div className="signatures">
          <ContractViewSignatures contract={data} />
        </div>
      </div>

    </ >
  )
}
