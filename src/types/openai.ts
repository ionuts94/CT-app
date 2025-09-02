import { Message } from "openai/resources/beta/threads/messages"

export type T_ChatInit = {
  threadId: string,
  chatSettings: T_ChatSettings
}

export type T_ChatSettings = {
  id: string,
  company: string,
  context_builder: string,
  increase_context_rate: string,
  conversational_level: string
  conversational_level_description: string,
  conversational_level_instructions: string
  mandatory_questions: string, // '[]'
  updated_by: string
}

export type T_Message = Partial<Message> & {
  metadata?: {
    hidden?: boolean
  }
}