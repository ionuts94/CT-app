import { AuditAction, AuditLog, PartyRole } from "@prisma/client";
import { Eye, FileText, Mail, MessageCircle, PencilLine, ReceiptText, ShieldBan, Signature, Undo, X } from "lucide-react";

const getUserTypeLabel = (userType: PartyRole) => {
  switch (userType) {
    case "SENDER":
      return "Inițiator"
    case "SIGNER":
      return "Destinatar"
    default: "SYSTEM"
  }
}
export const AUDIT_ACTIONS = {
  CONTRACT_CREATED: (log: AuditLog) => {
    return {
      message: "Contractul a fost creat de catre " + getUserTypeLabel(log.actorType) + ".",
      icon: ReceiptText,
    }
  },
  CONTRACT_SENT: (log: AuditLog) => {
    return {
      message: "Contractul a fost trimis de catre " + getUserTypeLabel(log.actorType) + ".",
      icon: Mail,
    }
  },
  CONTRACT_VIEWED: (log: AuditLog) => {
    return {
      message: "Contractul a fost vazut de catre " + getUserTypeLabel(log.actorType) + ".",
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
      message: "Contractul a fost modificat de catre " + getUserTypeLabel(log.actorType) + ".",
      icon: PencilLine,
    }
  },
  CONTRACT_SIGNED_OWNER: (log: AuditLog) => {
    return {
      message: "Contractul a fost semnat de cate " + getUserTypeLabel(log.actorType) + ".",
      icon: Signature,
    }
  },
  CONTRACT_SIGNED_SIGNER: (log: AuditLog) => {
    return {
      message: "Contractul a fost semnat de cate " + getUserTypeLabel(log.actorType) + ".",
      icon: Signature,
    }
  },
  CONTRACT_DECLINED: (log: AuditLog) => {
    return {
      message: "Contractul a fost respins de cate " + getUserTypeLabel(log.actorType) + ".",
      icon: X,
    }
  },
  CONTRACT_REVOKED: (log: AuditLog) => {
    return {
      message: "Contractul a fost retras de cate " + getUserTypeLabel(log.actorType) + ".",
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