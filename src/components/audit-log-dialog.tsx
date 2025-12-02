import { AuditLog } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { AUDIT_ACTIONS } from "@/constants/audit-log.constants"

type Props = {
  auditLog: AuditLog[] | []
}

export const AuditLogDialog: React.FC<Props> = ({ auditLog }) => {
  return (
    <Dialog>
      <DialogTrigger>
        Vezi Audit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contract Audit Log</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          {auditLog.map(item => (
            <div className="bg-red-200">
              {AUDIT_ACTIONS[item.action](item).message}

            </div>
          ))}
        </div>

      </DialogContent>
    </Dialog>
  )
}