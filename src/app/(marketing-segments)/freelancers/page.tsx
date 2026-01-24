// app/(marketing)/freelanceri/page.tsx

import { PactlyLogo } from "@/components/logo"
import Link from "next/link"

export default function FreelancersLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PactlyLogo className="h-[36px] md:h-[60px] mb-2" />
          </Link>

          <nav className="flex items-center gap-2">
            <a
              href="#cum-functioneaza"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              How it works
            </a>
            <a
              href="#beneficii"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              Benefits
            </a>
            <a
              href="#preturi"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              Pricing
            </a>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Try it free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-2 w-2 rounded-full bg-primary" />
                For freelancers & B2B collaborations
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Send professional contracts without stress or endless email threads.
              </h1>

              <p className="text-lg leading-relaxed text-slate-600">
                Pactly helps you create, send, and sign contracts in one
                place. You get{" "}
                <span className="font-medium text-primary">
                  audit logs, an organised archive, and reminders
                </span>{" "}
                so you’re covered before and after signing.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Try free (3 contracts)
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  I already have an account
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 text-sm">
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">3 contracts</p>
                  <p className="text-slate-600">free, one time</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">Audit trail</p>
                  <p className="text-slate-600">for every action</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">Archive</p>
                  <p className="text-slate-600">automatically organised</p>
                </div>
              </div>
            </div>

            {/* Right-side "mock" card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Example: collaboration agreement
                  </p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    DRAFT
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Services collaboration</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Client: Example Ltd
                    <br />
                    Freelancer: Firstname Lastname
                  </p>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Signatures</span>
                      <span className="font-medium">2 / 2</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Signing deadline</span>
                      <span className="font-medium">—</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Expires</span>
                      <span className="font-medium">31 Jan</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      Send for signing
                    </button>
                    <button className="w-full rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                      Save draft
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">What you gain as a freelancer</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>• Fewer follow-ups and lost emails</li>
                    <li>• A professional process in front of clients</li>
                    <li>• A clear record if disputes arise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Pain */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">
                If you send contracts as PDF + email, you’re doing a lot of invisible work.
              </h2>
              <p className="text-slate-600">
                We’re not competing with Word or Google Docs. We’re competing with everything
                that happens after you export the PDF: sending, follow-ups, versions, storage,
                deadlines, and client trust.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  title: "Manual follow-ups",
                  desc: "“Did you get a chance to sign?” — another email, another reminder.",
                },
                {
                  title: "Confusing versions",
                  desc: "V2_final_final.pdf and conversations with no clear history.",
                },
                {
                  title: "Scattered storage",
                  desc: "Contracts in email, drive, desktop — hard to find when you need them.",
                },
                {
                  title: "Forgotten deadlines",
                  desc: "Signing deadlines, expiry, renewals — on sticky notes or in your head.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficii" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">
              For freelancers: clarity, control, and trust.
            </h2>
            <p className="max-w-3xl text-slate-600">
              Pactly organises your entire workflow: from draft, to signing, to archiving
              and deadlines. Clients see a professional process, and you get a clear record of every step.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Audit trail",
                desc: "Every action is logged: who viewed, who signed, when, and what changed.",
              },
              {
                title: "Automatic reminders",
                desc: "Set a signing deadline or expiry date. We notify both sides before the deadline.",
              },
              {
                title: "Organised archive",
                desc: "All your contracts in one place: quick search, statuses, and versions.",
              },
              {
                title: "Client confidence",
                desc: "Clients get access to the contract and audit trail without digging through emails.",
              },
              {
                title: "Clear signing flow",
                desc: "Send for signing, track status, and close the collaboration without chaos.",
              },
              {
                title: "AI assistant (optional)",
                desc: "Help clients understand clauses faster. You save time on repetitive explanations.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-semibold">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cum-functioneaza" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Designed to be fast and professional, even if you only send a few contracts per month.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create or start from a template",
                desc: "In a few minutes you have a clear contract, without getting lost in versions.",
              },
              {
                step: "2",
                title: "Send for signing",
                desc: "Your client receives a secure link and can review and sign without complicated steps.",
              },
              {
                step: "3",
                title: "Track and archive automatically",
                desc: "See status in real time. The contract stays in your archive with a full audit trail.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {s.step}
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold">Quick tip for freelancers</p>
            <p className="mt-1 text-sm text-slate-600">
              If you work with different clients, start from a template and change only the details.
              In 2–3 minutes you can send a new contract.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preturi" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Pricing for freelancers</h2>
            <p className="max-w-3xl text-slate-600">
              Start with 3 free contracts (one time). Then choose: pay per contract or monthly.
              Simple, no surprises.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* Trial */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">Trial</p>
              <p className="mt-2 text-4xl font-semibold">€0</p>
              <p className="mt-1 text-sm text-slate-600">
                3 free contracts, one time.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Full access to the platform</li>
                <li>• Audit trail & archive</li>
                <li>• Fast signing</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get started
              </Link>
            </div>

            {/* PAYG */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">Pay as you go</p>
              <p className="mt-2 text-4xl font-semibold">€5</p>
              <p className="mt-1 text-sm text-slate-600">per contract sent</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Ideal if you send contracts occasionally</li>
                <li>• No subscription</li>
                <li>• Audit trail & archive included</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Choose PayG
              </Link>
              <p className="mt-3 text-xs text-slate-500">
                Tip: if you send contracts regularly, a subscription will be better value.
              </p>
            </div>

            {/* Starter */}
            <div className="relative rounded-2xl border border-primary bg-white p-6 shadow-sm">
              <div className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Recommended for freelancers
              </div>
              <p className="text-sm font-semibold text-slate-700">Starter</p>
              <p className="mt-2 text-4xl font-semibold">€15</p>
              <p className="mt-1 text-sm text-slate-600">per month • 5 contracts</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• 5 contracts included / month</li>
                <li>• Full audit trail + archive</li>
                <li>• Reminders for deadlines/expiry</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start with Starter
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold">What you get in every plan</p>
            <p className="mt-1 text-sm text-slate-600">
              Pactly includes audit logs, history, an archive, and a verifiable process —
              so you and your client have clarity before and after signing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Can I use Pactly if I already have Word/PDF templates?",
                a: "Yes. You can start from an existing template (import) or create one directly in the platform. What matters is the sending, signing, and audit process.",
              },
              {
                q: "Does my client need to create an account?",
                a: "Usually, no. Your client receives a secure link to view and sign the contract without complicated steps.",
              },
              {
                q: "What happens after signing?",
                a: "The contract stays in your archive with a full audit trail. You can return to it any time, and your client has access to the same final version.",
              },
              {
                q: "Can I set a signing deadline or expiry date?",
                a: "Yes. Set deadlines and we’ll send reminders before signing deadlines/expiry (depending on your plan).",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-semibold">
                  Start with 3 free contracts.
                </h3>
                <p className="mt-2 text-slate-600">
                  Test the full product. If you like it, continue with pay-as-you-go or a subscription.
                  Simple.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Create a free account
                </Link>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Talk to us
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} Pactly</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary">
                Privacy policy
              </Link>
              <Link href="/tos" className="hover:text-primary">
                Terms & conditions
              </Link>
              <Link href="/security" className="hover:text-primary">
                Security
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
