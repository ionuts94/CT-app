import { Search } from "lucide-react"
import { Input } from "./ui/input"

type Props = {

}

export const Searchbar: React.FC<Props> = ({ }) => {
  return (
    <div className="px-4 py-1 rounded-lg border border-sidebar-primary shadow-sm bg-card-secondary flex items-center justify-center w-[400px] text-color-secondary">
      <Search />
      <Input className="outline-none border-none shadow-none" placeholder="Cauta contracte, clienti, sabloane" />
    </div>
  )
}