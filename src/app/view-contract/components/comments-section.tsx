"use client"

import { Comment } from "@/components/comment"
import { ResizableTextInput } from "@/components/resizable-text-input"
import { Text } from "@/components/topography"
import { cn } from "@/lib/utils"
import CTComments from "@/sdk/comments"
import { CommentWithUser } from "@/types/services/comments"
import { T_ViewContract } from "@/types/services/contracts"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  comments: CommentWithUser[]
  contract: T_ViewContract
  isSender: boolean
  user?: User
}

export const CommentsSection: React.FC<Props> = ({
  comments,
  contract,
  isSender,
  user,
}) => {
  const router = useRouter()
  const [input, setInput] = useState("")

  const postComment = () => {
    if (!input.trim()) return

    toast.promise(
      async () => {
        const { error } = await CTComments.postNewComment({
          content: input,
          contractId: contract.id,
          partyRole: isSender ? "SENDER" : "SIGNER",
          firstName: isSender
            ? contract.company.name.split(" ")[0]
            : contract.receiverName.split(" ")[0],
          lastName: isSender
            ? contract.company.name.split(" ").slice(1).join(" ")
            : contract.receiverName.split(" ").slice(1).join(" "),
          email: isSender ? contract.owner.email : contract.receiverEmail,
          userId: user?.id,
        })

        if (error) {
          throw new Error("Failed to post the comment")
        }

        setInput("")
        router.refresh()
        return "Comment posted successfully"
      },
      {
        loading: "Posting comment...",
        success: (message: string) => message,
        error: (err: any) => err.message,
      }
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between w-full py-4 border-b mb-2">
        <Text weight="bold">Comments</Text>
        <Text weight="bold" size="sm" className="text-black/70">
          Visible to both parties
        </Text>
      </div>

      {/* Input */}
      <div className={cn("w-full pb-4 lg:px-0 mt-4")}>
        <ResizableTextInput
          value={input}
          disabled={false}
          onChange={setInput}
          onSubmit={postComment}
          containerClassName="bg-input border mx-auto rounded-lg px-[4px] pr-[8px] py-[2px] items-center focus:outline-primary"
          buttonClassName="size-8"
          placeholder="Add a comment"
        />
      </div>

      {/* Comments list */}
      <div className="flex flex-col gap-4 pb-10">
        {comments?.length === 0 && (
          <Text className="text-center py-4 text-black/40">
            No comments have been posted yet
          </Text>
        )}

        {comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  )
}
