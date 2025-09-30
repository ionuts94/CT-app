import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { Input } from "@/components/form-elements"
import { UserInput } from "./user-input"
import { useRef, useState } from "react"
import { ConversationContainer } from "./conversation-container"
import { DefaultChatTransport, UIDataTypes, UIMessage, UITools } from "ai"
import { useChat } from "@ai-sdk/react"
import { envs } from "@/constants/envs"

type Props = {

}

export const ChatAssistantSection: React.FC<Props> = ({ }) => {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState("")

  const conversationContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainerToBottom = () => {
    if (!conversationContainerRef.current) return;
    conversationContainerRef.current.scrollTo({
      top: conversationContainerRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  const handleSubmit = () => {
    console.log("input")
    console.log(input)

    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <ConversationContainer messages={messages} />
      <UserInput
        handleSubmit={handleSubmit}
        status="ready"
        inputValue={input}
        setInput={setInput}
        scrollContainerToBottom={scrollContainerToBottom}
        user={{}}
      />
    </div>
  )
}

const PREDEFINED_QUESTIONS = [
  "Explica termenii de plata",
  "Ce se intampla daca reziliez mai devreme?",
  "Rezumatul obligatiilor mele"
]