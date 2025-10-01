import { UserInput } from "./user-input"
import { useRef, useState } from "react"
import { ConversationContainer } from "./conversation-container"
import { DefaultChatTransport } from "ai"
import { useChat } from "@ai-sdk/react"

type Props = {
  contractContent: string
}

export const ChatAssistantSection: React.FC<Props> = ({ contractContent }) => {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: {
        contractContent
      }
    })
  });

  const conversationContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainerToBottom = () => {
    if (!conversationContainerRef.current) return;
    conversationContainerRef.current.scrollTo({
      top: conversationContainerRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  const handleSubmit = () => {
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="flex flex-col h-full justify-between p-4 pb-0 gap-4 max-h-[8">
      <ConversationContainer messages={messages} />
      <UserInput
        handleSubmit={handleSubmit}
        status="ready"
        inputValue={input}
        setInput={setInput}
        scrollContainerToBottom={scrollContainerToBottom}
        user={{}}
        containerClassName="sticky bottom-0 left-0"
      />
    </div>
  )
}