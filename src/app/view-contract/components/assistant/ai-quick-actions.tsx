import {
  Sparkles,
  ShieldAlert,
  FileText,
  CreditCard,
  DoorOpen
} from "lucide-react";

const actions = [
  {
    label: "Explain contract",
    icon: Sparkles,
    iconClassName: "text-[#00AEEF]",
  },
  {
    label: "Summarize key terms",
    icon: FileText,
    iconClassName: "text-slate-500",
  },
  {
    label: "Any risks?",
    icon: ShieldAlert,
    iconClassName: "text-amber-500",
  },
  {
    label: "Explain payment terms",
    icon: CreditCard,
    iconClassName: "text-green-600",
  },
  {
    label: "Can this be cancelled?",
    icon: DoorOpen,
    iconClassName: "text-red-500",
  },
];

type Props = {
  sendAiMessage: (message: string) => void
}

export function AiQuickActions({ sendAiMessage }: Props) {
  return (
    <div className="rounded-xl">
      <p className="mb-3 text-sm font-semibold text-slate-800">
        Ask AI about this contract
      </p>

      <div className="flex flex-col gap-2">
        {actions.map(({ label, icon: Icon, iconClassName }) => (
          <button
            key={label}
            type="button"
            onClick={() => sendAiMessage(label)}
            className="cursor-pointer flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Icon size={16} className={iconClassName} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}