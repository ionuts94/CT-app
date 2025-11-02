"use client"

import { T_ViewContract } from "@/actions/post/contracts"
import { PostContractComment } from "@/actions/post/contracts/comments"
import { Comment } from "@/components/comment"
import { ResizableTextInput } from "@/components/resizable-text-input"
import { Text } from "@/components/topography"
import { cn } from "@/lib/utils"
import { Comment as CommentType, Contract } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  comments: CommentType[],
  contract: T_ViewContract,
  isSender: boolean
}

export const CommentsSection: React.FC<Props> = ({ comments, contract, isSender }) => {
  console.log("contract")
  console.log(contract)
  console.log(comments)
  const router = useRouter()
  const [input, setInput] = useState("")

  const postComment = async () => {
    const { error } = await PostContractComment({
      content: input,
      contractId: contract.id,
      partyRole: isSender ? "SENDER" : "SIGNER",
      firstName: isSender ? contract.company.name.split(" ")[0] : contract.reciverName.split(" ")[0],
      lastName: isSender ? contract.company.name.split(" ")[1] : contract.reciverName.split(" ")[1],
    })
    if (error) return toast.error(error)
    toast.success("Comentariul a fost postat")
    router.refresh()
    setInput("")
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full py-4 border-b mb-2">
        <Text weight="bold">Comentarii</Text>
        <Text weight="bold" size="sm" className="text-black/70">Vizibile ambelor parti</Text>
      </div>
      <div className={cn("w-full pb-4 px-[10px] lg:px-0 mt-4")}>
        <ResizableTextInput
          value={input}
          disabled={false}
          onChange={setInput}
          onSubmit={postComment}
          containerClassName="bg-input border mx-auto rounded-lg px-[4px] pr-[8px] py-[2px] items-center focus:outline-primary"
          buttonClassName="size-8"
          placeholder="Adauga un comentariu"
        />
      </div>
      <div className="flex flex-col gap-4">
        {comments?.length === 0 && <Text className="text-center py-4 text-black/40">Nu au post publicate comentarii pana acum</Text>}
        {comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  )
}