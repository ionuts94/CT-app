import { Card } from "@/components/ui/card"
import { UIMessage } from "ai"
import { Bot, User } from "lucide-react"

type Props = {
  message: UIMessage
}

export const MessageComponent: React.FC<Props> = ({ message }) => {
  if (message.role === "assistant") return <AssistantMessage message={message} />
  return <UserMessage message={message} />
}


export const AssistantMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-start gap-2">
      <Bot className="!size-6 mt-2 whitespace-nowrap flex-shrink-0" />
      <Card className="p-2 rounded-lg">
        {message.parts.map((part, index) =>
          part.type === 'text' ? <span key={index}>{part.text}</span> : null,
        )}
      </Card>
    </div>
  )
}


export const UserMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-start gap-2 max-w-[90%] justify-end ml-auto">
      <Card className="p-2 rounded-lg bg-input">
        {message.parts.map((part, index) =>
          part.type === 'text' ? <span key={index}>{part.text}</span> : null,
        )}
      </Card>
      <User className="!size-6 whitespace-nowrap mt-2 flex-shrink-0" />
    </div>
  )
}