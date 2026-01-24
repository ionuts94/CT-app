"use client";

import { LandingPageWidth } from "../components/landing-page-width";

export default function TermsPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Terms and Conditions
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Last updated: January 2025
          <br />
          Please read these Terms and Conditions carefully before using the Pactly platform.
        </p>

        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 leading-relaxed">

          <h2 className="text-2xl font-semibold mt-12">1. Acceptance of terms</h2>
          <p>
            By using the Pactly platform (&quot;Platform&quot;), you fully agree to these Terms and Conditions.
            If you do not agree with any part of them, please do not use the service.
          </p>

          <h2 className="text-2xl font-semibold mt-12">2. Account creation and use</h2>
          <p>
            To access the Platform&apos;s features, users must create an account using a valid email address.
            Users are responsible for maintaining the confidentiality of their login credentials.
          </p>
          <ul>
            <li>Using another person&apos;s account is strictly prohibited.</li>
            <li>You are responsible for all activity carried out under your account.</li>
            <li>We reserve the right to suspend accounts that appear suspicious or abusive.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">3. Service description</h2>
          <p>
            Pactly provides tools for creating, sending, reviewing, and digitally signing contracts.
            The Platform includes features such as a text editor, contract management, comments, audit logs,
            notifications, and digital signatures in accordance with EU legislation.
          </p>

          <h2 className="text-2xl font-semibold mt-12">4. Digital signatures</h2>
          <p>
            Signatures generated through the Platform comply with European legislation regarding simple electronic signatures.
            Users and their clients are responsible for the accuracy and legality of the information included in documents.
          </p>

          <h2 className="text-2xl font-semibold mt-12">5. Pricing and billing</h2>
          <p>
            The Platform offers 3 free contracts upon registration. After these are used, users may purchase
            additional contracts or activate a monthly subscription plan.
          </p>
          <ul>
            <li>Pay as You Go – €5 per contract</li>
            <li>Starter – €15 per month</li>
            <li>Team – €30 per month</li>
            <li>Business – €50 per month</li>
          </ul>

          <p>
            All payments are securely processed through our payment partners. We do not store banking or card details
            on our servers.
          </p>

          <h2 className="text-2xl font-semibold mt-12">6. Personal data and privacy</h2>
          <p>
            Personal data is processed in accordance with our Privacy Policy. We are committed to protecting
            the information of our users and their clients.
          </p>

          <h2 className="text-2xl font-semibold mt-12">7. Security</h2>
          <p>
            The Platform uses encryption, GDPR-compliant servers, and full audit logs for every contract action.
            However, users are responsible for securing their own devices and passwords.
          </p>

          <h2 className="text-2xl font-semibold mt-12">8. Limitation of liability</h2>
          <p>
            Pactly shall not be held liable for losses resulting from improper use of the Platform,
            user errors, or technical issues caused by third parties.
          </p>

          <h2 className="text-2xl font-semibold mt-12">9. Suspension or termination of access</h2>
          <p>
            We reserve the right to restrict or suspend access in cases of:
          </p>
          <ul>
            <li>violation of these Terms;</li>
            <li>fraud attempts;</li>
            <li>abusive use of the Platform.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">10. Changes to the terms</h2>
          <p>
            These Terms and Conditions may be updated periodically. Continued use of the Platform constitutes
            acceptance of the updated version.
          </p>

          <h2 className="text-2xl font-semibold mt-12">11. Contact</h2>
          <p>
            If you have any questions regarding these Terms, you can contact us at:
          </p>

          <p className="font-medium text-gray-900">
            support@contracttransparent.com
          </p>

        </div>

      </LandingPageWidth>
    </section>
  );
}
