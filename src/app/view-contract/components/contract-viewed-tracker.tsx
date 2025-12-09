"use client"

import CTAudit from "@/sdk/audit"
import { useEffect } from "react"


type Props = {
  contractId: string,
  actorType: "SENDER" | "SIGNER"
}

export const ContractViewedTracker: React.FC<Props> = ({ contractId, actorType }) => {
  useEffect(() => {
    CTAudit.logContractViewed({ contractId, actorType })
  }, [contractId, actorType])

  return null
}