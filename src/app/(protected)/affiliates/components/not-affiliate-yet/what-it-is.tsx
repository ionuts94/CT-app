type Props = {

}

export const WhatItIs: React.FC<Props> = ({ }) => {
  const items = [
    {
      label: 'Commission',
      value: '30%',
      description: 'Recurring share from every successful payment.',
    },
    {
      label: 'Activation',
      value: 'Instant',
      description: 'Your affiliate account is created as soon as you opt in.',
    },
    {
      label: 'Invite method',
      value: 'Link',
      description: 'Share your personal sign-up link with new users.',
    },
  ]

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] p-4 shadow-sm sm:p-5">
      <div className="mx-auto ">
        <span className="inline-flex rounded-full bg-main-foreground px-3 py-1 text-xs font-semibold text-[#335CFF]">
          Affiliate opt-in
        </span>

        <div className="mt-5 ">
          <h2 className=" text-2xl font-bold text-[#0f172a] sm:text-3xl leading-tight">
            Earn recurring commission for every new customer you bring to Pactly.
          </h2>

          <p className="mt-3  text-sm leading-6 text-slate-500">
            Share Pactly with your network and earn 30% from every successful payment made by the
            users you refer. Once activated, your affiliate account is created automatically using
            your existing Pactly profile.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-app p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-xl font-bold text-[#0f172a]">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}