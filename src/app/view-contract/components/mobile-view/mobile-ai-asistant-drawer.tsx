"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Bot } from "lucide-react"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { ReceiverContractAssistant } from "../assistant/receiver-contract-assistant"
import { T_ViewContract } from "@/types/services/contracts"

type Props = {
  contractData: T_ViewContract,
}

export const MobileAsistantDrawer: React.FC<Props> = ({ contractData }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <Bot className="shrink-0 size-4.5" />
          <Text>AI Assistant</Text>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 min-h-[90vh] max-h-[90vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="mt-8" />
        <div className="h-[90vh] overflow-auto">
          <ReceiverContractAssistant
            contractContent={contractData?.currentVersion?.content as string}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}