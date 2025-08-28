import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Text } from "@/components/topography"

type Row = {
  id: string
  title: string
  client: string
  status: "DRAFT" | "PENDING" | "SIGNED" | "EXPIRED"
  updatedAt: string
}

const statusMap: Record<Row["status"], string> = {
  DRAFT: "bg-draft text-foreground",
  PENDING: "bg-warning text-warning-foreground",
  SIGNED: "bg-success text-success-foreground",
  EXPIRED: "bg-destructive text-primary-foreground",
}

export function ContractsTable({ data }: { data: Row[] }) {
  return (
    <Card className="shadow-md">
      <div className="p-4 border-b">
        <Text size="lg" weight="semibold">Recent Contracts</Text>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>{r.client}</TableCell>
                <TableCell>
                  <Badge className={statusMap[r.status]}>{r.status}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{r.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
