"use client";

import { Mail, Phone, MapPin, Building } from "lucide-react";
import { LandingPageWidth } from "../components/landing-page-width";

export default function ContactPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        {/* Label */}
        <p className="text-primary font-semibold tracking-wide uppercase text-center mb-2">
          Contact
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          We’re here to help
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Have questions about the platform, your account, or contracts?
          Send us a message and we’ll get back to you shortly.
        </p>

        {/* Info + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Info cards */}
          <div className="space-y-8">

            {/* Email */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <Mail className="text-primary w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Support email
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Technical support or account-related questions.
                </p>
                <a
                  href="mailto:support@contracttransparent.com"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  support@contracttransparent.com
                </a>
              </div>
            </div>

            {/* Sales */}
            {/* <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <Phone className="text-primary w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sales enquiries
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Need information about plans or partnerships?
                </p>
                <a
                  href="mailto:sales@contracttransparent.com"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  sales@contracttransparent.com
                </a>
              </div>
            </div> */}

            {/* Address */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <MapPin className="text-primary w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600 text-sm">
                  10 Example Street, Bucharest, Romania
                </p>
              </div>
            </div>

            {/* Company */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <Building className="text-primary w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Company details
                </h3>
                <p className="text-gray-600 text-sm">
                  Contract Transparent SRL
                  <br />VAT ID: RO12345678
                  <br />Trade Register: J00/0000/2025
                </p>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.909348294301!2d26.1025383!3d44.4267679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff475e1f6ef1%3A0x8c51a9c0c12a091d!2sBucharest!5e0!3m2!1sen!2sro!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

        </div>

        {/* FORM */}
        <form
          className="bg-gray-50 border border-gray-200 p-10 rounded-xl shadow-sm max-w-3xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert("You’ll wire this up with Brevo here, bossule 💙");
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send us a message
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-primary text-white text-lg font-medium py-3 rounded-xl hover:opacity-90 transition"
          >
            Send message
          </button>
        </form>

      </LandingPageWidth>
    </section>
  );
}
