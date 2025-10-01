import { UIMessage } from "ai"
import { AssistantMessage, MessageComponent, UserMessage } from "./message"

type Props = {
  messages: any[]
}

export const ConversationContainer: React.FC<Props> = ({ messages }) => {
  const INITIAL_ASSISTANT_MESSAGE = {
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Salut. Sunt asistentul tau pentru acest contract. Pot raspunde la intrebari specifice contractului cum ar fi 'Explica-mi termenii de plata', 'Ce se intampla daca reziliez mai devreme?' sau 'Rezumatul obligatiilor mele'."
      }
    ]
  }
  return (
    <div className="flex-1 overflow-auto flex flex-col gap-2">
      <AssistantMessage message={INITIAL_ASSISTANT_MESSAGE as UIMessage} />
      {messages.map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}