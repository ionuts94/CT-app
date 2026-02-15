import React from 'react';
import {
  ShieldCheck,
  Bot,
  Eye,
  MessageSquare,
  Zap,
  Clock,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles
} from 'lucide-react';
import { LandingPageHeader } from '@/app/(landing)/components/landing-page-header';
import { Footer } from '@/app/(landing)/components/footer';

export default function PactlyLandingPage() {
  return (
    <>
      <LandingPageHeader />
      <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
        {/* Navigation */}
        {/* <nav className="fixed w-full z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-[#00AEEF] p-1.5 rounded-lg">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">Pactly</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#problem" className="hover:text-[#00AEEF] transition">The Problem</a>
          <a href="#features" className="hover:text-[#00AEEF] transition">Features</a>
          <a href="#pricing" className="hover:text-[#00AEEF] transition">Pricing</a>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-[#00AEEF]">Login</button>
          <button className="px-5 py-2 text-sm font-bold bg-[#00AEEF] text-white rounded-full hover:bg-[#0096ce] shadow-lg shadow-blue-100 transition">
            Start Free
          </button>
        </div>
      </nav> */}

        {/* Hero Section */}
        <header className="max-w-6xl mx-auto pt-24 pb-24 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#00AEEF] text-xs font-bold mb-8 uppercase tracking-widest">
            <Zap size={14} /> Built for 10-20 Person Agencies
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Close contracts in <span className="text-[#00AEEF]">hours</span>,<br className="hidden md:block" /> not weeks.
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Static PDFs are where projects go to die. Pactly gives your clients a professional web portal with a built-in AI assistant to answer their questions in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/sign-up">
              <button className="px-10 py-5 bg-[#00AEEF] text-white cursor-pointer rounded-xl font-bold text-lg hover:shadow-2xl hover:bg-[#0096ce] transition-all hover:-translate-y-1">
                Claim Your 3 Free Contracts
              </button>
            </a>
            <button className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              View Live Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-400 font-medium italic underline decoration-[#00AEEF]">No credit card required. No time limits.</p>
        </header>

        {/* The Pain Section */}
        <section id="problem" className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-center text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-16 underline decoration-2 underline-offset-8">The Agency Reality</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-400">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic">"I need to talk to my lawyer..."</h3>
                <p className="text-slate-600 leading-relaxed">
                  Clients freeze when they hit legal jargon they don't understand. Every day of waiting is a day your team's schedule sits empty.
                  <span className="block mt-4 font-bold text-slate-800 text-sm">Pactly's AI Assistant removes this bottleneck by explaining clauses instantly.</span>
                </p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-400">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic">Invisible Scope Creep</h3>
                <p className="text-slate-600 leading-relaxed">
                  Without clear definitions of what is NOT included, "just one quick tweak" turns into unbilled labor. Agencies lose roughly 15% of profit to "favors."
                  <span className="block mt-4 font-bold text-slate-800 text-sm">Our structured editor protects your time and your bottom line.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="max-w-7xl mx-auto py-32 px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Bot size={40} className="text-[#00AEEF] mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI Contract Assistant</h3>
              <p className="text-slate-600">Your contract explains itself. The AI clarifies clauses like "Liability" or "Payment Terms" in plain English, directly on the contract page.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Eye size={40} className="text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Real-Time Tracking</h3>
              <p className="text-slate-600">See the exact second a client opens, scrolls, or reviews the contract. You'll know exactly when to send that "follow-up" nudge.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <Globe size={40} className="text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Full White-Labeling</h3>
              <p className="text-slate-600">Your logo, your brand colors, and your custom domain. Pactly disappears into your brand, giving you an enterprise-level image.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section - Free-First Flow */}
        <section id="pricing" className="py-32 bg-slate-900 text-white rounded-[3rem] mx-4 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-4 font-mono italic">Total Transparency</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold">Start for free. Scale together.</h3>
              <p className="text-slate-400 mt-6 text-xl max-w-2xl mx-auto">All new users get access to **all features** through our 3-contract gift credits.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Free */}
              <div className="p-8 rounded-3xl border border-slate-700 bg-slate-800/50">
                <h4 className="text-lg font-bold text-[#00AEEF]">Free Account</h4>
                <p className="text-4xl font-black my-4">3 Credits</p>
                <p className="text-sm text-slate-400 mb-6 italic">Perfect for testing the system on your next lead.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400" /> AI Assistant included</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400" /> White-label branding</li>
                </ul>
              </div>

              {/* Starter */}
              <div className="p-8 rounded-3xl border-2 border-[#00AEEF] bg-slate-800 shadow-2xl relative">
                <div className="absolute -top-3 right-6 bg-[#00AEEF] text-xs font-bold px-3 py-1 rounded-full text-white">UPGRADE LATER</div>
                <h4 className="text-lg font-bold text-[#00AEEF]">Agency Starter</h4>
                <p className="text-4xl font-black my-4">£25<span className="text-sm font-normal text-slate-400">/mo</span></p>
                <p className="text-sm text-slate-400 mb-6">After you use your first 3 contracts.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00AEEF]" /> 10 Contracts / month</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00AEEF]" /> Priority Support</li>
                </ul>
              </div>

              {/* Plus */}
              <div className="p-8 rounded-3xl border border-slate-700 bg-slate-800/50">
                <h4 className="text-lg font-bold text-[#00AEEF]">Agency Plus</h4>
                <p className="text-4xl font-black my-4">£50<span className="text-sm font-normal text-slate-400">/mo</span></p>
                <p className="text-sm text-slate-400 mb-6">For high-volume agency workflows.</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-slate-500" /> 30 Contracts / month</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-slate-500" /> Slack Integration</li>
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

        {/* Footer */}
        <footer className="py-20 text-center text-slate-400 text-sm">
          <div className="flex justify-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#00AEEF]" />
            <span className="font-bold text-slate-800">Pactly.io</span>
          </div>
          © 2026 Pactly. Built for agencies that want to grow profitably.
        </footer>
      </div>
      <Footer />
    </>
  );
}