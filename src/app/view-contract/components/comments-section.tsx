import { Text } from "@/components/topography"

type Props = {

}

export const CommentsSection: React.FC<Props> = ({ }) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full py-4 border-b">
        <Text weight="bold">Comentarii</Text>
        <Text weight="bold" size="sm" className="text-black/70">Vizibile ambelor parti</Text>
      </div>
    </div>
  )
}