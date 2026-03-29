"use client"

import { AiSvg } from "@/components/svgs/ai-svg"
import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PredefinedAssistantSection } from "./predefined-assistant-section"
import { ChatAssistantSection } from "./chat-assistant-section"

type Props = {
  contractContent: string
}

export const ReceiverContractAssistant: React.FC<Props> = ({ contractContent }) => {
  const [viewTab, setViewTab] = useState("predefined")

  const renderTabContent = () => {
    if (viewTab === "chat") return <ChatAssistantSection contractContent={contractContent} />
    return <PredefinedAssistantSection />
  }

  return (
    <ChatAssistantSection contractContent={contractContent} />
  )
}