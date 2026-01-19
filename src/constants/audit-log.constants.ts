import { AuditAction, AuditLog, PartyRole } from "@prisma/client"
import {
  Eye,
  FileText,
  Mail,
  MessageCircle,
  PencilLine,
  ReceiptText,
  ShieldBan,
  Signature,
  Undo,
  X,
} from "lucide-react"

export const getUserTypeLabel = (userType: PartyRole) => {
  switch (userType) {
    case "SENDER":
      return "Sender"
    case "SIGNER":
      return "Recipient"
    case "SYSTEM":
      return "System"
    default:
      return "System"
  }
}

export const AUDIT_ACTIONS = {
  CONTRACT_CREATED: (log: AuditLog) => {
    return {
      message: "The contract was created.",
      icon: ReceiptText,
    }
  },

  CONTRACT_SENT: (log: AuditLog) => {
    return {
      message: "The contract was sent.",
      icon: Mail,
    }
  },

  CONTRACT_VIEWED: (log: AuditLog) => {
    return {
      message: "The contract was opened.",
      icon: Eye,
    }
  },

  COMMENT_ADDED: (log: AuditLog) => {
    const userType = getUserTypeLabel(log.actorType)
    return {
      message: `${userType} added a comment.`,
      icon: MessageCircle,
    }
  },

  CONTRACT_UPDATED: (log: AuditLog) => {
    return {
      message: "The contract was updated.",
      icon: PencilLine,
    }
  },

  CONTRACT_SIGNED_OWNER: (log: AuditLog) => {
    return {
      message: "The contract was signed by the sender.",
      icon: Signature,
    }
  },

  CONTRACT_SIGNED_SIGNER: (log: AuditLog) => {
    return {
      message: "The contract was signed by the recipient.",
      icon: Signature,
    }
  },

  CONTRACT_DECLINED: (log: AuditLog) => {
    return {
      message: "The contract was declined.",
      icon: X,
    }
  },

  CONTRACT_REVOKED: (log: AuditLog) => {
    return {
      message: "The contract was revoked.",
      icon: Undo,
    }
  },

  CONTRACT_EXPIRED: (log: AuditLog) => {
    return {
      message: "The contract has expired.",
      icon: ShieldBan,
    }
  },

  PDF_GENERATED: (log: AuditLog) => {
    return {
      message:
        "The signed PDF version was generated after both parties completed signing.",
      icon: FileText,
    }
  },

  CONTRACT_SIGNED_NOTIFICATION_SENT: (log: AuditLog) => {
    return {
      message:
        "The signed PDF was sent to all parties involved.",
      icon: Mail,
    }
  },
}
