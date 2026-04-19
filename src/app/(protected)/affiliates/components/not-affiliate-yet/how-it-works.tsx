import { BadgeDollarSign, Link2, UserPlus } from "lucide-react"

type Props = {

}

export const HowItWorks: React.FC<Props> = ({ }) => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Activate the program',
      description:
        'Accept the affiliate terms and we create your affiliate account automatically.',
      icon: UserPlus,
    },
    {
      step: 'Step 2',
      title: 'Invite new users',
      description:
        'Share your personalized sign-up link or send direct invites to people in your network.',
      icon: Link2,
    },
    {
      step: 'Step 3',
      title: 'Receive commission',
      description:
        'You earn 30% from each completed payment made by the users you referred.',
      icon: BadgeDollarSign,
    },
  ]

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 shadow-sm">
      <h2 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900">
        How it works
      </h2>

      <div className="mt-5">
        {steps.map((item, index) => {
          const Icon = item.icon

          return (
            <div key={item.step}>
              <div className="flex items-start gap-3 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main-foreground text-main">
                  <Icon className="h-4 w-4" strokeWidth={1.9} />
                </div>

                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-slate-400">{item.step}</p>
                  <h3 className="mt-0.5 text-[16px] font-semibold tracking-[-0.01em] text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-[360px] text-[15px] text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && <div className="mx-0 my-1 h-px bg-slate-200" />}
            </div>
          )
        })}
      </div>
    </section>
  )
}