import { Searchbar } from "@/components/searchbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {

}

export const ContractsFilter: React.FC<Props> = ({ }) => {
  return (
    <Card className="p-4 flex-row items-center justify-between">
      <Searchbar />
      <StatusFilter />
    </Card>
  )
}

type StatusFilterProps = {

}

export const StatusFilter: React.FC<Props> = ({ }) => {
  return (
    <div className="bg-card-secondary rounded-lg flex gap-2 h-full p-1 border border-sidebar-primary shadow-sm">
      <Button
        variant="none"
        className={cn("text-color-secondary rounded-lg hover:bg-sidebar-primary", "bg-background !border-[2px] !border-primary shadow-sm shadow-primary hover:bg-background")}
      >
        All
      </Button>
      <Button variant="none" className="text-color-secondary hover:bg-sidebar-primary">
        Pending
      </Button>
      <Button variant="none" className="text-color-secondary hover:bg-sidebar-primary">
        Signed
      </Button>
      <Button variant="none" className="text-color-secondary hover:bg-sidebar-primary">
        Expired
      </Button>
      <Button variant="none" className="text-color-secondary hover:bg-sidebar-primary">
        Draft
      </Button>
    </div>
  )
}