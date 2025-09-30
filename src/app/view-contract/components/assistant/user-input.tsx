"use client"

import { ResizableTextInput } from "@/components/resizable-text-input"
import { ChatRequestOptions } from "ai"

import { Dispatch, SetStateAction, useEffect } from "react"

type Props = {
  user: any,
  inputValue: string,
  status: "error" | "submitted" | "streaming" | "ready",
  setInput: Dispatch<SetStateAction<string>>,
  handleSubmit: (
    event?: {
      preventDefault?: () => void
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void,
  scrollContainerToBottom: () => any,
}

export const UserInput: React.FC<Props> = ({
  user,
  inputValue,
  status,
  setInput,
  handleSubmit,
  scrollContainerToBottom = () => null,
}) => {
  const userId = user.id
  const isStreaming = status === "streaming"
  const isReady = status === "ready"
  const isDisabled = isStreaming || inputValue.length < 1

  const handleSendMessage = async () => {
    if (isDisabled) return;

    setInput("")


    scrollContainerToBottom()
  }

  useEffect(() => {
    if (isReady) {
      scrollContainerToBottom()
    }
  }, [isReady])

  return (
    <div className="w-full pb-4 px-[10px] lg:px-0">
      <ResizableTextInput
        value={inputValue}
        disabled={isDisabled}
        onChange={setInput}
        onSubmit={handleSendMessage}
        containerClassName="bg-input border max-w-[840px] mx-auto rounded-lg px-[4px] pr-[8px] py-[2px] items-center"
        buttonClassName="size-8"
      />
    </div>
  )
}