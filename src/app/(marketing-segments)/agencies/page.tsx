// app/(marketing)/agencies/page.tsx
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { PactlyLogo } from "@/components/logo";
import CTEventLog from "@/sdk/event-log";
import EventLogService from "@/services/event-log-service";
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pactly for Digital Agencies — Stop scope creep before it starts",
  description:
    "Pactly helps digital agencies send contracts clients actually understand — before they sign. Clarify scope, avoid awkward disputes, and sign with confidence."
}

export default async function AgenciesLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PactlyLogo className="h-[36px]" />
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Send a contract
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Built for UK digital agencies
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Clarity before signing
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Stop scope creep before it starts.
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Pactly helps agencies send contracts clients actually understand —{" "}
              <span className="font-semibold text-slate-900">before they sign</span>.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send a contract
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              3 contracts free · No credit card required · Cancel anytime
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <FeatureCard title="Clarify scope early" desc="Make expectations explicit before work begins." />
              <FeatureCard title="One shared version" desc="No email chaos. No “final_v7.pdf”." />
              <FeatureCard title="Confidence to proceed" desc="A clear moment of agreement for both sides." />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">A familiar moment</p>
                  <h2 className="mt-1 text-lg font-semibold">You’ve had this conversation.</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Scope creep
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <QuoteBubble>“Oh, I thought that was included.”</QuoteBubble>
                <QuoteBubble>“We assumed this was part of the scope.”</QuoteBubble>
                <QuoteBubble>“Can you just add this quickly?”</QuoteBubble>
              </div>

              <p className="mt-5 text-sm text-slate-600">
                The contract wasn’t unclear.{" "}
                <span className="font-semibold text-slate-900">The understanding was.</span>
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold">Pactly closes the gap:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Comment directly on clauses
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Explicit accept or reject before signing
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    One place for decisions and context
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/sign-up"
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Try it with a real contract
                </Link>
                <p className="mt-3 text-center text-xs text-slate-500">
                  Start with 3 free contracts · Then £25/month for up to 10 contracts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight">Contracts don’t fail. Conversations do.</h2>
              <p className="mt-3 text-slate-600">
                Most tools optimise for speed of signing — not understanding. That’s why scope disputes still happen,
                even with “proper contracts”.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Clients don’t fully read contracts" desc="They skim, trust, and assume." />
                <InfoCard title="Clarifications live elsewhere" desc="Emails, calls, Slack — and then get lost." />
                <InfoCard title="No clear decision moment" desc="Nothing explicitly confirms understanding." />
                <InfoCard title="When it blows up, it’s awkward" desc="By then, work has already started." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight">
                Pactly makes understanding part of the contract.
              </h2>
              <p className="mt-3 text-slate-600">
                Before anyone signs, both sides can clarify, question, and agree — in one place.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard title="Clause comments" desc="Discuss specifics without endless email threads." />
                <FeatureCard title="Clear accept / reject" desc="Make decisions explicit before signing." />
                <FeatureCard title="One clean link" desc="Send a professional experience clients respect." />
                <FeatureCard title="Less stress" desc="Avoid “that wasn’t included” moments later." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PAY */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Because one avoided conflict pays for Pactly many times over.
              </h2>
              <p className="mt-3 text-slate-600">
                One scope dispute costs hours. One unhappy client costs reputation. Pactly helps you protect the
                relationship — not just the contract.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Simple pricing</p>
                <p className="mt-1 text-xs text-slate-500">
                  Includes 3 free contracts to try Pactly before upgrading
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">£25</span>
                  <span className="text-sm text-slate-600">/ month</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Up to 10 contracts</p>

                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Unlimited comments & clarifications
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    One shared version & agreement history
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Cancel anytime
                  </li>
                </ul>

                <Link
                  href="/sign-up"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Send your first contract
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">How Pactly works</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            <StepCard n="1" title="Create or upload" desc="Use your template or upload a PDF." />
            <StepCard n="2" title="Send a link" desc="A clean, professional client experience." />
            <StepCard n="3" title="Clarify on clauses" desc="Comments where they matter." />
            <StepCard n="4" title="Confirm understanding" desc="Clear accept / reject before signing." />
            <StepCard n="5" title="Sign with confidence" desc="Work starts with aligned expectations." />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold">Send your next contract with confidence.</h3>
            <p className="mt-2 text-sm text-slate-600">
              Built for UK digital agencies who value clarity and trust.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send your first contract
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
              P
            </span>
            <span>© {new Date().getFullYear()} Pactly</span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link className="text-slate-600 hover:text-primary" href="/privacy">
              Privacy
            </Link>
            <Link className="text-slate-600 hover:text-primary" href="/tos">
              Terms
            </Link>
            <Link className="text-slate-600 hover:text-primary" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
      <PageViewTracker
        path="/agencies"
        source="linkedin_dm_v1"
      />
    </main>
  )
}
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
          {n}
        </span>
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function QuoteBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
      {children}
    </div>
  )
}
