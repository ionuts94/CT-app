import { UIMessage } from "ai"
import { AssistantMessage, MessageComponent } from "./message"

type Props = {
  messages: any[]
}

export const ConversationContainer: React.FC<Props> = ({ messages }) => {
  const INITIAL_ASSISTANT_MESSAGE = {
    role: "assistant",
    parts: [
      {
        type: "text",
        text: `Hello. I am your contract assistant.
I can help you understand specific clauses and implications of this contract.

You can ask questions like:
• “Explain the payment terms”
• “What happens if I terminate early?”
• “What are my main obligations?”
• “Are there any risks I should be aware of?”`
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