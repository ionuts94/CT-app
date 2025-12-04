import { AuditAction, AuditLog, PartyRole } from "@prisma/client";
import { Eye, FileText, Mail, MessageCircle, PencilLine, ReceiptText, ShieldBan, Signature, Undo, X } from "lucide-react";

export const getUserTypeLabel = (userType: PartyRole) => {
  switch (userType) {
    case "SENDER":
      return "Inițiator"
    case "SIGNER":
      return "Destinatar"
    case "SYSTEM":
      return "SYSTEM"
    default: "SYSTEM"
  }
}

export const AUDIT_ACTIONS = {
  CONTRACT_CREATED: (log: AuditLog) => {
    return {
      message: "Contractul a fost creat.",
      icon: ReceiptText,
    }
  },
  CONTRACT_SENT: (log: AuditLog) => {
    return {
      message: "Contractul a fost trimis.",
      icon: Mail,
    }
  },
  CONTRACT_VIEWED: (log: AuditLog) => {
    return {
      message: "Contractul a fost deschis.",
      icon: Eye,
    }
  },
  COMMENT_ADDED: (log: AuditLog) => {
    const userType = getUserTypeLabel(log.actorType) + "ul"
    return {
      message: userType + " a adaugat un comentariu.",
      icon: MessageCircle,
    }
  },
  CONTRACT_UPDATED: (log: AuditLog) => {
    return {
      message: "Contractul a fost modificat.",
      icon: PencilLine,
    }
  },
  CONTRACT_SIGNED_OWNER: (log: AuditLog) => {
    return {
      message: "Contractul a fost semnat.",
      icon: Signature,
    }
  },
  CONTRACT_SIGNED_SIGNER: (log: AuditLog) => {
    return {
      message: "Contractul a fost semnat.",
      icon: Signature,
    }
  },
  CONTRACT_DECLINED: (log: AuditLog) => {
    return {
      message: "Contractul a fost respins.",
      icon: X,
    }
  },
  CONTRACT_REVOKED: (log: AuditLog) => {
    return {
      message: "Contractul a fost retras.",
      icon: Undo,
    }
  },
  CONTRACT_EXPIRED: (log: AuditLog) => {
    return {
      message: "Contractul a expirat",
      icon: ShieldBan
    }
  },
  PDF_GENERATED: (log: AuditLog) => {
    return {
      message: "Versiunea PDF semnata de catre ambele parti a fost generata.",
      icon: FileText
    }
  },
}