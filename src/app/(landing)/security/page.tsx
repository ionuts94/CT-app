"use client";

import { LandingPageWidth } from "../components/landing-page-width";
import { Shield, Lock, Server, FileCheck, RefreshCcw, EyeOff } from "lucide-react";

export default function SecurityPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Securitatea datelor tale
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Ne luăm securitatea în serios. Contractele tale, datele clienților tăi și informațiile
          companiei sunt protejate prin standarde moderne, conforme cu legislația europeană.
        </p>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Conform GDPR</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Platforma respectă Regulamentul (UE) 2016/679. Toate procesele sunt construite
              astfel încât datele personale să fie tratate legal, transparent și în siguranță.
            </p>
          </div>

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Lock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Criptare completă</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Toate datele sunt criptate în tranzit (HTTPS/TLS 1.2+) și în repaus, pe servere
              europene de înaltă securitate.
            </p>
          </div>

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <Server className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Servere în Uniunea Europeană</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Infrastructura este găzduită exclusiv în centre de date din UE, conforme ISO 27001.
            </p>
          </div>

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <FileCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Audit Trail complet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fiecare acțiune din contract este înregistrată: comentarii, modificări, vizualizări,
              semnături și date tehnice. Totul transparent.
            </p>
          </div>

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <EyeOff className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Acces controlat</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nicio persoană neautorizată nu are acces la contractele tale. Nici măcar echipa
              Contract Transparent, cu excepția cazurilor strict necesare pentru suport tehnic.
            </p>
          </div>

          {/* Item */}
          <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
            <RefreshCcw className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Backup-uri automate</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Toate datele sunt replicate și salvate automat pentru evitarea pierderii informațiilor,
              chiar și în situații neprevăzute.
            </p>
          </div>

        </div>

        {/* LAST SECTION */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Construim o platformă în care poți avea încredere
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Siguranța datelor tale este prioritatea noastră. Continuăm să îmbunătățim în mod constant
            tehnologiile de securitate și practicile interne pentru a asigura protecția completă a
            informațiilor tale și ale clienților tăi.
          </p>

          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 text-lg rounded-xl font-medium shadow-sm hover:opacity-90 transition"
          >
            Contactează-ne pentru detalii
          </a>
        </div>

      </LandingPageWidth>
    </section>
  );
}
