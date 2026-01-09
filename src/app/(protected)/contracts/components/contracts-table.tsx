"use client"

import { StatusBadge } from "@/components/status-badge"
import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Contract, ContractStatus } from "@prisma/client"
import { useRouter } from "next/navigation"
import { NoContractsFound } from "./no-contracts-found"
import { format } from "date-fns"
import { ContractControls } from "./contract-controls"
import { dateUtils } from "@/lib/date-utils"

type Props = {
  contracts: Contract[]
}

export const ContractsTable: React.FC<Props> = ({ contracts }) => {
  const router = useRouter()

  const viewContract = (contract: Contract) => {
    return null;
    if (contract.status === ContractStatus.DRAFT)
      return router.push("/contracts/edit?c=" + contract.id)
    router.push("/c/view-contract?c=" + contract.id)
  }

  if (!contracts || contracts.length < 1) {
    return (
      <div className="w-full flex justify-center mt-2">
        <NoContractsFound />
      </div>
    )
  }

  console.log("first contract")
  console.log(contracts[0])

  return (
    <div className="w-full">
      <Card className="pt-0 w-full overflow-hidden">
        <Table>
          <TableHeader className="">
            <TableRow className="h-auto bg-slate-100">
              <TableHead className="py-4 text-[16px] font-bold pl-4">Client</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Titlu</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Status</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Creat</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Trimis</TableHead>
              <TableHead className="text-right py-4 text-[16px] font-bold pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract, index) => (
              <TableRow key={index} className="hover:bg-muted/50" onClick={() => viewContract(contract)}>
                <TableCell className="py-5 text-[15px] text-ellipsis max-w-[300px] pl-4 overflow-hidden">{contract.receiverName}</TableCell>
                <TableCell className="py-5 text-[15px] line-clamp-1 text-ellipsis max-w-[300px]">{contract.title}</TableCell>
                <TableCell>
                  <StatusBadge status={contract.status} />
                </TableCell>
                <TableCell className="py-5 text-[15px]">
                  {dateUtils.formatUtcToLocaleString(contract.createdAt)}
                </TableCell>
                <TableCell className="py-5 text-[15px]">
                  {contract.lastSentAt ? dateUtils.formatUtcToLocaleString(contract.lastSentAt) : ""}
                </TableCell>
                <TableCell className="py-5 text-[15px] text-right flex justify-end pr-4">
                  <ContractControls contract={contract} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

