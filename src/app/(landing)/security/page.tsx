"use client";

import { LandingPageWidth } from "../components/landing-page-width";
import { Shield, Lock, Server, FileCheck, RefreshCcw, EyeOff } from "lucide-react";

export default function SecurityPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Data security you can trust
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          We take security seriously. Your contracts, your clients’ data, and your company
          information are protected using modern standards, fully compliant with European
          regulations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              GDPR compliant
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The platform complies with Regulation (EU) 2016/679. All processes are designed
              to ensure personal data is handled lawfully, transparently, and securely.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Lock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              End-to-end encryption
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All data is encrypted in transit (HTTPS/TLS 1.2+) and at rest, on highly secure
              European servers.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Server className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              EU-based servers
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our infrastructure is hosted exclusively in EU data centres compliant with
              ISO 27001 standards.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <FileCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Full audit trail
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every contract action is logged: comments, edits, views, signatures,
              and technical metadata. Fully transparent.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <EyeOff className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Controlled access
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No unauthorised person can access your contracts. Not even the Contract
              Transparent team, except when strictly necessary for technical support.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <RefreshCcw className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Automatic backups
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All data is automatically replicated and backed up to prevent information
              loss, even in unforeseen situations.
            </p>
          </div>

        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Built to be a platform you can trust
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Protecting your data is our top priority. We continuously improve our security
            technologies and internal practices to ensure full protection of your information
            and your clients’ data.
          </p>

          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 text-lg rounded-xl font-medium shadow-sm hover:opacity-90 transition"
          >
            Contact us for more details
          </a>
        </div>

      </LandingPageWidth>
    </section>
  );
}
