"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MessageCircleMore } from "lucide-react"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { T_ViewContract } from "@/types/services/contracts"
import { CommentWithUser } from "@/types/services/comments"
import { CommentsSection } from "../comments-section"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
  isSender?: boolean
}

export const MobileCommentsDrawer: React.FC<Props> = ({ contractData, commentsData, isSender }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <MessageCircleMore className="shrink-0 size-4.5" />
          <Text>Discussions</Text>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 min-h-[90vh] max-h-[90vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="mt-8" />
        <div className="h-[90vh] overflow-auto">
          <CommentsSection
            comments={commentsData}
            contract={contractData}
            isSender={false}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}