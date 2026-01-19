"use client";

import { LandingPageWidth } from "../components/landing-page-width";

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Privacy Policy
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Last updated: January 2025
          <br />
          This policy explains how we collect, use, and protect your personal data.
        </p>

        <div className="prose prose-gray max-w-none leading-relaxed prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">

          <h2 className="text-2xl font-semibold mt-12">1. Introduction</h2>
          <p>
            Contract Transparent SRL (“we”, “the platform”, “the service”) respects your privacy
            and is committed to protecting all personal data in accordance with Regulation (EU)
            2016/679 (GDPR).
          </p>

          <h2 className="text-2xl font-semibold mt-12">2. Who we are</h2>
          <p>
            The data controller is Contract Transparent SRL, based in Romania.
          </p>
          <p className="mb-0">Data protection contact email:</p>
          <p className="font-medium text-gray-900">support@contracttransparent.com</p>

          <h2 className="text-2xl font-semibold mt-12">3. What personal data we collect</h2>
          <p>
            We collect the following categories of data depending on how you use the platform:
          </p>

          <h3 className="text-xl font-semibold mt-6">3.1. Data provided by the user</h3>
          <ul>
            <li>First and last name</li>
            <li>Email address</li>
            <li>Company name / role within the company</li>
            <li>Contract data (parties, contact details, contractual content)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3.2. Automatically generated data</h3>
          <ul>
            <li>IP address</li>
            <li>Device and browser information</li>
            <li>Access and audit logs (actions within contracts)</li>
            <li>Timestamps for signatures and edits</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3.3. Data of your clients</h3>
          <p>
            When you send a contract to another person, we process:
          </p>
          <ul>
            <li>recipient’s email address</li>
            <li>added comments</li>
            <li>electronic signatures</li>
            <li>document action history</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">4. How we use your data</h2>
          <p>We use personal data only for purposes permitted under GDPR:</p>
          <ul>
            <li>to create and manage your account</li>
            <li>to send contracts and related notifications</li>
            <li>to generate audit logs and digital signatures</li>
            <li>to improve the platform</li>
            <li>to provide technical support and assistance</li>
            <li>for security and abuse prevention purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">5. Legal basis for processing</h2>
          <p>The legal bases we rely on include:</p>
          <ul>
            <li>performance of a contract – when you use the platform</li>
            <li>consent – for marketing communications</li>
            <li>legitimate interest – account security and fraud prevention</li>
            <li>legal obligation – retention of certain records</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">6. Data storage</h2>
          <p>
            Data is stored on secure servers located within the European Union.
            Contracts and electronic signatures are retained in accordance with
            applicable legal retention periods, unless otherwise required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-12">7. Who has access to your data</h2>
          <p>
            Access is strictly limited to:
          </p>
          <ul>
            <li>the Contract Transparent team (only when required for support)</li>
            <li>our IT infrastructure providers (under GDPR-compliant agreements)</li>
            <li>partners responsible for payment processing</li>
          </ul>
          <p>
            We do not sell, rent, or share your data with third parties for commercial purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-12">8. Data security</h2>
          <p>
            We use encryption, audit trails, access controls, firewalls, backups,
            and other measures to protect your data and your clients’ data.
          </p>

          <h2 className="text-2xl font-semibold mt-12">9. Your rights</h2>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li>right of access</li>
            <li>right to rectification</li>
            <li>right to erasure (“right to be forgotten”)</li>
            <li>right to restriction of processing</li>
            <li>right to data portability</li>
            <li>right to object</li>
          </ul>

          <p>
            To exercise these rights, you can contact us at{" "}
            <span className="font-medium text-gray-900">support@contracttransparent.com</span>.
          </p>

          <h2 className="text-2xl font-semibold mt-12">10. International transfers</h2>
          <p>
            We do not normally transfer data outside the EU. If this ever becomes necessary,
            we will use only GDPR-compliant providers and Standard Contractual Clauses.
          </p>

          <h2 className="text-2xl font-semibold mt-12">11. Cookies</h2>
          <p>
            We use strictly necessary cookies for platform functionality and optional cookies
            for analytics and performance. You can manage your preferences through your browser.
          </p>

          <h2 className="text-2xl font-semibold mt-12">12. Changes to this policy</h2>
          <p>
            This policy may be updated periodically. The current version will always be available
            on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-12">13. Contact</h2>
          <p>
            For questions regarding data protection, you can contact us at:
          </p>
          <p className="font-medium text-gray-900">
            support@contracttransparent.com
          </p>

        </div>

      </LandingPageWidth>
    </section>
  );
}
