import React from 'react';
import {
  ShieldCheck,
  Bot,
  Eye,
  Globe,
  Zap,
  CheckCircle2,
  PlayCircle,
  FileText,
  Clock3,
  BadgeHelp
} from 'lucide-react';
import { LandingPageHeader } from '@/app/(landing)/components/landing-page-header';
import { Footer } from '@/app/(landing)/components/footer';

export default function PactlyLandingPage() {
  return (
    <>
      <LandingPageHeader />
      <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
        {/* Hero Section */}
        <header className="max-w-6xl mx-auto pt-24 pb-20 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#00AEEF] text-xs font-bold mb-8 uppercase tracking-widest">
            <Zap size={14} /> Built for agencies and service businesses
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Turn static PDFs into <span className="text-[#00AEEF]">interactive contracts</span>.
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Pactly helps you create, send, track, and sign contracts through a modern web experience your clients can actually understand.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/sign-up">
              <button className="px-10 py-5 bg-[#00AEEF] text-white cursor-pointer rounded-xl font-bold text-lg hover:shadow-2xl hover:bg-[#0096ce] transition-all hover:-translate-y-1">
                Claim Your 3 Free Contracts
              </button>
            </a>
            <a href="#demo">
              <button className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all cursor-pointer">
                Watch Demo
              </button>
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400 font-medium italic underline decoration-[#00AEEF]">
            No credit card required. No time limits.
          </p>
        </header>

        {/* Demo Section */}
        {/* <section id="demo" className="max-w-6xl mx-auto px-6 pb-24">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-bold text-[#00AEEF] uppercase tracking-[0.25em] mb-2">Product Demo</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">See how Pactly works in under 60 seconds</h2>
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium">
                <PlayCircle size={18} className="text-[#00AEEF]" />
                Replace this block with your recorded walkthrough
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="aspect-video w-full rounded-2xl bg-slate-900 relative overflow-hidden border border-slate-800">
                Replace this wrapper with your real video embed.
                    Example:
                    <video controls className="h-full w-full object-cover" poster="/demo-poster.jpg">
                      <source src="/pactly-demo.mp4" type="video/mp4" />
                    </video>
               
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                    <PlayCircle size={42} className="text-white" />
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">Coming soon...</h3>
                  <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">
                    Show the full flow: create contract, send link, client opens branded page, asks questions, signs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Outcome Strip */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <Clock3 size={26} className="text-[#00AEEF] mb-4" />
              <h3 className="text-xl font-bold mb-2">Faster signing</h3>
              <p className="text-slate-600">Clients review contracts as interactive pages instead of downloading another PDF.</p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <BadgeHelp size={26} className="text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Fewer questions</h3>
              <p className="text-slate-600">Built-in AI explains clauses in plain English right where confusion happens.</p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <Globe size={26} className="text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Stronger brand</h3>
              <p className="text-slate-600">Your logo, your colors, your domain. The contract feels like part of your business.</p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-center text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-16 underline decoration-2 underline-offset-8">
              Why deals slow down
            </h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-400">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic">“I need to talk to my lawyer...”</h3>
                <p className="text-slate-600 leading-relaxed">
                  Clients pause when they hit legal jargon they do not understand. Every extra day between proposal and signature increases the chance the deal cools off.
                  <span className="block mt-4 font-bold text-slate-800 text-sm">
                    Pactly explains confusing clauses instantly, right on the contract page.
                  </span>
                </p>
              </div>

              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-400">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic">Static PDFs kill momentum</h3>
                <p className="text-slate-600 leading-relaxed">
                  PDFs feel heavy, outdated, and easy to ignore. There is no visibility, no interaction, and no easy way to guide clients toward signing.
                  <span className="block mt-4 font-bold text-slate-800 text-sm">
                    Pactly turns contracts into clear, trackable web experiences built to move deals forward.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto py-32 px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-4">What makes Pactly different</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">Everything you need to get contracts signed faster</h2>
            <p className="text-lg text-slate-600">Built for modern agencies, consultants, and service businesses that want a smoother signing experience.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Bot size={40} className="text-[#00AEEF] mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI Contract Assistant</h3>
              <p className="text-slate-600">Help clients understand terms like liability, payment schedules, and scope without waiting for another email thread.</p>
            </div>

            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Eye size={40} className="text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Real-Time Tracking</h3>
              <p className="text-slate-600">See when clients open, read, and review the contract so you know exactly when to follow up.</p>
            </div>

            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Globe size={40} className="text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Full White-Labeling</h3>
              <p className="text-slate-600">Your logo, brand colors, and custom domain make every contract feel like part of your own product experience.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="rounded-[2rem] bg-slate-900 text-white px-8 md:px-12 py-14">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-4">How it works</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-5">From draft to signature in four simple steps</h2>
              <p className="text-slate-300 text-lg">No messy PDFs. No confusing back and forth. Just a clean client experience from start to finish.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <FileText size={28} className="text-[#00AEEF] mb-4" />
                <h3 className="text-xl font-bold mb-2">1. Create</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Build your contract with structured sections and reusable templates.</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <Globe size={28} className="text-[#00AEEF] mb-4" />
                <h3 className="text-xl font-bold mb-2">2. Send</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Share a branded contract page instead of sending a static attachment.</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <Bot size={28} className="text-[#00AEEF] mb-4" />
                <h3 className="text-xl font-bold mb-2">3. Clarify</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Clients can understand terms instantly with contextual AI help.</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <CheckCircle2 size={28} className="text-[#00AEEF] mb-4" />
                <h3 className="text-xl font-bold mb-2">4. Sign</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Track activity in real time and get contracts signed without the usual delays.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-slate-900 text-white rounded-[3rem] mx-4 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-4 font-mono italic">Simple pricing</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold">Start free. Upgrade only when it works.</h3>
              <p className="text-slate-400 mt-6 text-xl max-w-2xl mx-auto">
                Every new account gets 3 free contracts with full access to the core experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl border border-slate-700 bg-slate-800/50">
                <h4 className="text-lg font-bold text-[#00AEEF]">Free Account</h4>
                <p className="text-4xl font-black my-4">3 Credits</p>
                <p className="text-sm text-slate-400 mb-6 italic">Perfect for testing Pactly on your next client deal.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400" /> AI Assistant included</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400" /> White-label branding</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400" /> Real-time tracking</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl border-2 border-[#00AEEF] bg-slate-800 shadow-2xl relative">
                <div className="absolute -top-3 right-6 bg-[#00AEEF] text-xs font-bold px-3 py-1 rounded-full text-white">MOST POPULAR</div>
                <h4 className="text-lg font-bold text-[#00AEEF]">Agency Starter</h4>
                <p className="text-4xl font-black my-4">£25<span className="text-sm font-normal text-slate-400">/mo</span></p>
                <p className="text-sm text-slate-400 mb-6">For smaller teams sending contracts every month.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00AEEF]" /> 10 Contracts / month</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00AEEF]" /> Priority support</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00AEEF]" /> White-label branding</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl border border-slate-700 bg-slate-800/50">
                <h4 className="text-lg font-bold text-[#00AEEF]">Agency Plus</h4>
                <p className="text-4xl font-black my-4">£50<span className="text-sm font-normal text-slate-400">/mo</span></p>
                <p className="text-sm text-slate-400 mb-6">For growing teams handling higher contract volume.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-slate-400" /> 30 Contracts / month</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Slack integration</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Priority support</li>
                </ul>
              </div>
            </div>

            <div className="mt-20 text-center">
              <a href="/sign-up">
                <button className="px-12 py-6 bg-[#00AEEF] text-white rounded-xl cursor-pointer font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-blue-900/40">
                  Create Account & Get 3 Credits
                </button>
              </a>
              <p className="mt-4 text-slate-500 text-sm">No credit card required to join.</p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Stop sending contracts like it is 2005.
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Give clients a contract experience that is faster to understand, easier to sign, and fully aligned with your brand.
          </p>
          <a href="/sign-up">
            <button className="px-10 py-5 bg-[#00AEEF] text-white cursor-pointer rounded-xl font-bold text-lg hover:shadow-2xl hover:bg-[#0096ce] transition-all hover:-translate-y-1">
              Start Free With 3 Contracts
            </button>
          </a>
        </section>

        {/* Lightweight Footer */}
        <footer className="py-20 text-center text-slate-400 text-sm">
          <div className="flex justify-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#00AEEF]" />
            <span className="font-bold text-slate-800">Pactly.io</span>
          </div>
          © 2026 Pactly. Interactive contracts for modern service businesses.
        </footer>
      </div>
      <Footer />
    </>
  );
}
