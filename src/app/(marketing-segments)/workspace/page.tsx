// app/(marketing)/agencies-workspace/page.tsx
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { PactlyLogo } from "@/components/logo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pactly for Digital Agencies — Stop digging through emails",
  description:
    "Pactly keeps client agreements, clarifications, and decisions in one shared workspace — so your team always knows what was agreed, without searching through email threads and Drive folders."
};

export default async function AgenciesWorkspaceLandingPage() {
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
              Send an agreement
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
              Built for small digital agencies
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Daily clarity, not heavy CLM
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Stop searching through emails and documents to remember what you agreed with clients.
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Pactly keeps agreements, clarifications, and client decisions in one shared workspace — so nothing gets
              lost after signing.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send an agreement
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              3 agreements free · No credit card required · Cancel anytime
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <FeatureCard title="One shared version" desc="No email chaos. No “final_v7.pdf”." />
              <FeatureCard title="Clarity lives with the agreement" desc="Questions + answers stay attached." />
              <FeatureCard title="Faster internal handoffs" desc="Anyone can find what was promised." />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">A familiar moment</p>
                  <h2 className="mt-1 text-lg font-semibold">“Where did we agree on that?”</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Daily workflow
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <QuoteBubble>“Wait — did we include that?”</QuoteBubble>
                <QuoteBubble>“Was this decided on a call or in email?”</QuoteBubble>
                <QuoteBubble>“Let me check Drive… or Slack… or the PDF…”</QuoteBubble>
              </div>

              <p className="mt-5 text-sm text-slate-600">
                The problem isn’t the agreement.{" "}
                <span className="font-semibold text-slate-900">It’s losing the context around it.</span>
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold">Pactly keeps it all together:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Comments and clarifications live on the agreement
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Clients can ask questions in the right place
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    One clean link you can reference later
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/sign-up"
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Try it with a real agreement
                </Link>
                <p className="mt-3 text-center text-xs text-slate-500">
                  Start with 3 free agreements · Then £25/month for up to 10 agreements
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
              <h2 className="text-2xl font-semibold tracking-tight">Agreements don’t get lost. Context does.</h2>
              <p className="mt-3 text-slate-600">
                Most agency tools optimise for getting a signature — then everything moves back to email, Drive, and
                Slack. That’s where misunderstandings start.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Decisions scatter across tools" desc="Email threads, calls, Slack, meeting notes." />
                <InfoCard title="Clarifications disappear" desc="The “one important detail” gets forgotten later." />
                <InfoCard title="Teams waste time searching" desc="Finding answers becomes a daily tax on delivery." />
                <InfoCard title="Misunderstandings show up late" desc="Not because it wasn’t written — because it wasn’t found." />
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
              <h2 className="text-2xl font-semibold tracking-tight">Pactly keeps agreements and conversations together.</h2>
              <p className="mt-3 text-slate-600">
                Make the agreement the single source of truth — not just a PDF that gets buried.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard title="Agreement workspace" desc="Contracts, clarifications, and decisions in one place." />
                <FeatureCard title="Clause comments" desc="Discuss specifics where they matter — not in threads." />
                <FeatureCard title="Client Q&A" desc="Clients ask questions on the agreement, not across channels." />
                <FeatureCard title="Less back-and-forth later" desc="When questions come up, you have a clean reference." />
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
                Because “where was that agreed?” is a time sink you pay every week.
              </h2>
              <p className="mt-3 text-slate-600">
                Agencies lose hours digging through tools just to confirm details. Pactly keeps everything structured so
                your team moves faster and clients stay aligned.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Simple pricing</p>
                <p className="mt-1 text-xs text-slate-500">
                  Includes 3 free agreements to try Pactly before upgrading
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">£25</span>
                  <span className="text-sm text-slate-600">/ month</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Up to 10 agreements</p>

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
                  Send your first agreement
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
            <StepCard n="2" title="Send one link" desc="A clean workspace your client can access." />
            <StepCard n="3" title="Clarify in place" desc="Comments where they matter, not in email." />
            <StepCard n="4" title="Confirm decisions" desc="Clear record of what was agreed." />
            <StepCard n="5" title="Reference later" desc="Stop searching — answers stay attached." />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold">Send your next agreement — and keep the context with it.</h3>
            <p className="mt-2 text-sm text-slate-600">Built for small agencies who want clarity without heavy software.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send your first agreement
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

      <PageViewTracker path="/agencies-workspace" source="linkedin_dm_workflow_v1" />
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
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
  );
}

function QuoteBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
      {children}
    </div>
  );
}
