import { Text } from "@/components/topography"
import { T_ViewContract } from "@/types/services/contracts"

type Props = {
  contract: T_ViewContract
}

export const ContractViewSignatures: React.FC<Props> = ({ contract }) => {
  return (
    <div className="flex mt-10 justify-between pb-4 break-inside-avoid">
      {/* Provider */}
      <div className="flex flex-col gap-2 break-inside-avoid">
        <Text className="text-color-secondary">Service Provider Signature</Text>
        <div className="rounded-lg flex flex-col gap-4 relative">
          <div>
            <Text className="flex gap-2 items-center" size="lg" weight="semibold">
              {contract.company.name}
            </Text>
            <Text className="flex gap-2 items-center font-[400]" size="lg" >
              {contract.owner.firstName} {contract.owner.lastName} –{" "}
              <span className="opacity-60 font-[400]">Director</span>
            </Text>
          </div>
          <div className="w-full flex items-center justify-center">
            {contract?.ownerSignature?.imageUrl && (
              <img
                src={contract.ownerSignature.imageUrl}
                className="h-14 w-fit"
                alt="Provider signature"
              />
            )}
          </div>

        </div>
      </div>

      {/* Recipient */}
      <div className="flex flex-col gap-2 break-inside-avoid">
        <Text className="text-color-secondary">Recipient Signature</Text>
        <div className="rounded-lg gap-2 relative">
          <Text className="flex gap-2 items-center" size="lg" weight="semibold">
            {contract.receiverName}
          </Text>
        </div>
        <div className="flex-1 flex items-end">
          {contract?.receiverSignature?.imageUrl ? (
            <div className="w-full flex items-center justify-center">
              <img
                src={contract.receiverSignature.imageUrl}
                className="h-14 w-fit"
                alt="Recipient signature"
              />
            </div>
          ) : (
            <div className="w-full text-center border-b border-black border-dashed" />
          )}
        </div>
      </div>
    </div>
  )
}
