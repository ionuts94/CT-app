import { StatusBadge } from "@/components/status-badge"
import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_CONTRACTS } from "@/mock-data/contracts"

type Props = {

}

export const ContractsTable: React.FC<Props> = ({ }) => {
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
            {MOCK_CONTRACTS.map((contract, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="py-5 text-[15px]"><Input type="checkbox" className="size-4" /></TableCell>
                <TableCell className="py-5 text-[15px]">{contract.firstName} {contract.lastName}</TableCell>
                <TableCell className="py-5 text-[15px]">{contract.contractTitle}</TableCell>
                <TableCell>
                  <StatusBadge status={contract.status} />
                </TableCell>
                <TableCell className="py-5 text-[15px]">
                  {contract.date}
                </TableCell>
                <TableCell className="py-5 text-[15px] text-right">TODO</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

