import { T_ViewContract } from "@/actions/post/contracts"
import { Text } from "@/components/topography"

type Props = {
  contract: T_ViewContract
}

export const ContractViewSignatures: React.FC<Props> = ({ contract }) => {
  return (
    <div className="flex mt-10 justify-between pb-4">
      {/* Prestator */}
      <div className="flex flex-col gap-2">
        <Text className="text-color-secondary">Semnătura Prestator</Text>
        <div className="rounded-lg gap-2 relative">
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {contract.company.name}
          </Text>
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {contract.owner.firstName + " " + contract.owner.lastName} -{" "}
            <span className="opacity-60 font-semibold">Director</span>
          </Text>
          {contract?.signature?.imageUrl && (
            <img src={contract.signature.imageUrl} className="h-14 w-fit" />
          )}
        </div>
      </div>

      {/* Beneficiar */}
      <div className="flex flex-col gap-2">
        <Text className="text-color-secondary">Semnătura Beneficiar</Text>
        <div className="rounded-lg gap-2 relative">
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {contract.reciverName}
          </Text>
        </div>
        <div className="flex-1 flex items-end">
          <div className="w-full text-center border-b border-black border-dashed"></div>
        </div>
      </div>
    </div>
  )
}