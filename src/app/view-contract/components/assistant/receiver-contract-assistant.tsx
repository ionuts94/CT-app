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
    <Card className="flex flex-col h-full p-0 gap-0 w-full overflow-auto max max-h-[85vh]">
      <div className="flex flex-row items-center h-[50px] px-4 gap-2 bg-input border-b border-black/10">
        <AiSvg className="size-5 group-hover:text-white" />
        <Text size="lg" weight="bold" className="text-g">Asistent AI</Text>
      </div>

      <div className="bg-card-secondary flex gap-2 p-1 border border-sidebar-primary shadow-sm px-4">
        {/* <Button
          variant="none"
          className={cn(
            "w-1/2 text-color-secondary rounded-lg hover:bg-sidebar-primary",
            viewTab === "predefined" && "bg-background !border-[2px] !border-primary shadow-sm shadow-primary hover:bg-background"
          )}
          onClick={() => setViewTab("predefined")}
        >
          Predefinit
        </Button> */}
        <Button
          variant="none"
          className={cn(
            "w-1/2 text-color-secondary rounded-lg hover:bg-sidebar-primary border-[2px] border-transparent",
            viewTab === "chat" && "bg-background !border-[2px] !border-primary shadow-sm shadow-primary hover:bg-background"
          )}
          onClick={() => setViewTab("chat")}
        >
          Chat
        </Button>
      </div>

      <div className="flex-1">

        {renderTabContent()}
      </div>
    </Card>
  )
}