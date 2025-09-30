import { AssistantMessage, MessageComponent, UserMessage } from "./message"

type Props = {
  messages: any[]
}

export const ConversationContainer: React.FC<Props> = ({ messages }) => {
  console.log(messages)
  return (
    <div className="flex-1 overflow-auto flex flex-col gap-2">
      {messages.map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}