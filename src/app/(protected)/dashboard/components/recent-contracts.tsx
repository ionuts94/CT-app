"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { useRouter } from "next/navigation"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { TextCTA } from "@/components/topography/cta"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props = {

}

type Row = {
  id: string
  title: string
  client: string
  status: "DRAFT" | "PENDING" | "SIGNED" | "DECLINED" | "EXPIRED"
  updated: string
}

export const RecentContracts: React.FC<Props> = () => {
  const router = useRouter()

  return (
    <Card className="px-4 py-3 overflow-hidden w-full">
      <div className="flex items-center justify-between">
        <Text size="lg" weight="semibold">Contracte Recente</Text>
        <Button className="cursor-pointer">
          <TextCTA variant="secondary">Vezi toate contractele</TextCTA>
        </Button>
      </div>

      <div className="">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead>
                <Text weight="semibold" className="py-4">Client</Text>
              </TableHead>
              <TableHead>
                <Text weight="semibold">Titlu Contract</Text>
              </TableHead>
              <TableHead>
                <Text weight="semibold">Status</Text>
              </TableHead>
              <TableHead>
                <Text weight="semibold">Trimis</Text>
              </TableHead>
              <TableHead className="text-right">
                <Text weight="semibold">Actiuni</Text>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {
              RECENTS.map(contract => (
                <TableRow className="h-auto" key={contract.id}>
                  <TableCell className="py-4 font-medium">{contract.client}</TableCell>
                  <TableCell className="py-4">{contract.title}</TableCell>
                  <TableCell className="py-4"><StatusBadge status={contract.status} /></TableCell>
                  <TableCell className="py-4">{contract.updated}</TableCell>
                  <TableCell className="py-4 text-right">TODO</TableCell>
                </TableRow>
              ))
            } */}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

function Header() {
  return (
    <div className="px-4 py-2 bg-muted/30">
      <div className="grid grid-cols-[1fr_220px_160px_120px] gap-4">
        <Text size="sm" variant="secondary">Title</Text>
        <Text size="sm" variant="secondary">Client</Text>
        <Text size="sm" variant="secondary">Status</Text>
        <Text size="sm" variant="secondary">Updated</Text>
      </div>
    </div>
  )
}

const RECENTS = [
  { id: "ctr_01", title: "Contract Servicii Foto", client: "Studio Lumi", status: "PENDING", updated: "2h ago" },
  { id: "ctr_02", title: "Contract Mentenanță", client: "ACME SRL", status: "SIGNED", updated: "Yesterday" },
  { id: "ctr_03", title: "Contract Consultanță", client: "BlueLine", status: "DRAFT", updated: "2 days ago" },
] as const