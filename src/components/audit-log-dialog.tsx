"use client"

import { AuditLog } from "@prisma/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  AUDIT_ACTIONS,
  getUserTypeLabel,
} from "@/constants/audit-log.constants"
import { format } from "date-fns"
import { Text } from "./topography"
import { List } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type Props = {
  auditLog: AuditLog[] | []
}

type T_AuditActionItem = keyof typeof AUDIT_ACTIONS

export const AuditLogDialog: React.FC<Props> = ({ auditLog }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <List />
          View audit log
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[100vw] !max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Contract audit log</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto w-full">
          <div className="relative flex flex-col gap-6">
            <div className="absolute top-0 left-[15px] w-[2px] bg-gradient-to-b from-primary/20 to-input h-full pointer-events-none -z-1"></div>

            {auditLog.map((item) => {
              const Icon =
                AUDIT_ACTIONS[item.action as T_AuditActionItem](item).icon
              const createdAt = format(
                item.createdAt,
                "dd.MM.yyyy, HH:mm:ss"
              )

              return (
                <div key={item.id} className="flex items-start gap-2">
                  <div className="size-[32px] flex items-center justify-center border bg-input rounded-full">
                    <Icon size={18} className="text-primary" />
                  </div>

                  <div className="pt-1 flex flex-col gap-1">
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center w-fit p-1 px-2",
                        item.actorType === "SIGNER" &&
                        "bg-secondary text-secondary-foreground",
                        item.actorType === "SYSTEM" &&
                        "bg-secondary-foreground text-white",
                        item.actorType === "SENDER" &&
                        "bg-primary text-white"
                      )}
                    >
                      <Text
                        size="sm"
                        weight="semibold"
                        className="uppercase"
                      >
                        {getUserTypeLabel(item.actorType)}
                      </Text>
                    </div>

                    <Text size="sm" className="text-color-secondary">
                      {createdAt}
                    </Text>

                    <Text size="sm" weight="semibold">
                      {
                        AUDIT_ACTIONS[
                          item.action as T_AuditActionItem
                        ](item).message
                      }
                    </Text>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
