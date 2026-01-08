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

  return (
    <div className="w-full">
      <Card className="pt-0 w-full overflow-hidden">
        <Table>
          <TableHeader className="">
            <TableRow className="h-auto bg-slate-100">
              <TableHead className="w-4">
                <Input type="checkbox" className="size-4" />
              </TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Client</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Titlu</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Status</TableHead>
              <TableHead className="py-4 text-[16px] font-bold">Trimis</TableHead>
              <TableHead className="text-right py-4 text-[16px] font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract, index) => (
              <TableRow key={index} className="hover:bg-muted/50" onClick={() => viewContract(contract)}>
                <TableCell className="py-5 text-[15px]"><Input type="checkbox" className="size-4" /></TableCell>
                <TableCell className="py-5 text-[15px]">{contract.receiverName}</TableCell>
                <TableCell className="py-5 text-[15px]">{contract.title}</TableCell>
                <TableCell>
                  <StatusBadge status={contract.status} />
                </TableCell>
                <TableCell className="py-5 text-[15px]">
                  {format(contract.createdAt, "dd.MM.yyyy, HH:mm:ss")}
                </TableCell>
                <TableCell className="py-5 text-[15px] text-right flex justify-end">
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

