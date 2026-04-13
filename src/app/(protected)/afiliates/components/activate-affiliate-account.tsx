"use client"

import { ArrowRight, Check } from "lucide-react"

type Props = {
  onActivate?: () => void
  onMaybeLater?: () => void
  isLoading?: boolean
  agreed?: boolean
  onAgreedChange?: (value: boolean) => void
}

export const ActivateAffiliateAccount: React.FC<Props> = ({
  onActivate,
  onMaybeLater,
  isLoading = false,
  agreed = true,
  onAgreedChange,
}) => {
  const items = [
    {
      label: "Eligibility",
      value: null,
      description:
        "You can invite new users to Pactly through your personal referral flow once your account is activated.",
    },
    {
      label: "Payouts",
      value: null,
      description:
        "You receive 30% from every successful payment completed by users attributed to your referrals.",
    },
    {
      label: "Simple example",
      value: "150 lei commission",
      description:
        "If one of your referrals makes a 500 lei payment, your estimated commission is 150 lei.",
    },
  ]

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] p-4 shadow-sm sm:p-5">
      <div className="mx-auto">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-[#0f172a] sm:text-3xl">
            Activate your affiliate account
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Review the essentials below, confirm that you agree to the terms and
            conditions, and continue to create your affiliate account.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-app p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <p className="text-xs font-medium text-slate-500">{item.label}</p>

              {item.value ? (
                <p className="mt-2 text-xl font-bold text-[#0f172a]">
                  {item.value}
                </p>
              ) : null}

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-app p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <label className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => onAgreedChange?.(!agreed)}
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${agreed
                ? "border-[#335CFF] bg-[#335CFF] text-white"
                : "border-slate-300 bg-white text-transparent"
                }`}
              aria-pressed={agreed}
              aria-label="Agree to affiliate terms"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0f172a] sm:text-[15px]">
                I agree to the Pactly affiliate program terms and conditions.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                By continuing, you confirm that you accept the commercial terms,
                referral attribution rules, and the commission payout process.
              </p>
            </div>
          </label>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-500">
          Your affiliate account will be created based on your existing Pactly
          account. No extra setup is required before activation.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onMaybeLater}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Maybe later
          </button>

          <button
            type="button"
            onClick={onActivate}
            disabled={isLoading || !agreed}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#335CFF] px-4 text-sm font-medium text-white transition hover:bg-[#2b4fe6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            {isLoading ? "Activating..." : "Activate and continue"}
          </button>
        </div>
      </div>
    </section>
  )
}