"use client";

import { LandingPageWidth } from "../components/landing-page-width";

export default function TermsPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Termeni și Condiții
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Ultima actualizare: Ianuarie 2025
          <br />
          Te rugăm să citești cu atenție acești termeni înainte de a utiliza platforma Contract Transparent.
        </p>

        {/* LEGAL CONTENT */}
        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 leading-relaxed">

          {/* INTRO */}
          <h2 className="text-2xl font-semibold mt-12">1. Acceptarea termenilor</h2>
          <p>
            Utilizarea platformei Contract Transparent („Platforma”) reprezintă acceptarea integrală a acestor Termeni și Condiții.
            Dacă nu ești de acord cu oricare dintre secțiuni, te rugăm să nu folosești serviciul.
          </p>

          {/* ACCOUNT */}
          <h2 className="text-2xl font-semibold mt-12">2. Crearea și utilizarea contului</h2>
          <p>
            Pentru a accesa funcționalitățile Platformei, utilizatorul trebuie să creeze un cont folosind un email valid.
            Utilizatorul este responsabil pentru păstrarea confidențialității datelor de autentificare.
          </p>
          <ul>
            <li>Este interzisă folosirea contului altei persoane.</li>
            <li>Ești responsabil pentru activitatea desfășurată în contul tău.</li>
            <li>Ne rezervăm dreptul de a suspenda conturi suspecte sau abuzive.</li>
          </ul>

          {/* SERVICE */}
          <h2 className="text-2xl font-semibold mt-12">3. Descrierea serviciului</h2>
          <p>
            Contract Transparent oferă instrumente pentru crearea, trimiterea, revizuirea și semnarea digitală a contractelor.
            Platforma include funcționalități precum editor de texte, managementul contractelor, comentarii, audit log,
            notificări și semnătură digitală conform legislației UE.
          </p>

          {/* SIGNATURE */}
          <h2 className="text-2xl font-semibold mt-12">4. Semnături digitale</h2>
          <p>
            Semnăturile generate prin Platformă sunt conforme cu legislația europeană privind semnătura electronică simplă.
            Utilizatorul și clientul acestuia sunt responsabili de exactitatea și legalitatea informațiilor furnizate în documente.
          </p>

          {/* PRICING */}
          <h2 className="text-2xl font-semibold mt-12">5. Prețuri și facturare</h2>
          <p>
            Platforma oferă 3 contracte gratuite la înregistrare. După epuizarea acestora, utilizatorul poate achiziționa
            contracte suplimentare sau poate activa un plan lunar.
          </p>
          <ul>
            <li>Pay as You Go – 5€ / contract</li>
            <li>Starter – 15€ / lună</li>
            <li>Team – 30€ / lună</li>
            <li>Business – 50€ / lună</li>
          </ul>

          <p>
            Toate plățile sunt procesate securizat prin partenerii noștri și nu stocăm date bancare pe serverele noastre.
          </p>

          {/* DATA */}
          <h2 className="text-2xl font-semibold mt-12">6. Date personale și confidențialitate</h2>
          <p>
            Prelucrarea datelor personale este realizată conform Politicii de Confidențialitate. Ne angajăm să protejăm toate
            informațiile utilizatorilor și clienților acestora.
          </p>

          {/* SECURITY */}
          <h2 className="text-2xl font-semibold mt-12">7. Securitate</h2>
          <p>
            Platforma utilizează criptare, servere conforme GDPR și audit complet pentru fiecare acțiune efectuată în contracte.
            Cu toate acestea, utilizatorul este responsabil pentru protejarea propriului dispozitiv și a parolelor.
          </p>

          {/* LIABILITY */}
          <h2 className="text-2xl font-semibold mt-12">8. Limitarea răspunderii</h2>
          <p>
            Contract Transparent nu poate fi tras la răspundere pentru pierderi rezultate din utilizarea necorespunzătoare a
            platformei, erori ale utilizatorului sau probleme tehnice cauzate de terți.
          </p>

          {/* TERMINATION */}
          <h2 className="text-2xl font-semibold mt-12">9. Suspendarea sau încetarea accesului</h2>
          <p>
            Ne rezervăm dreptul de a limita sau suspenda accesul unui utilizator în cazul:
          </p>
          <ul>
            <li>încălcării termenilor;</li>
            <li>tentativelor de fraudă;</li>
            <li>utilizării abuzive a platformei.</li>
          </ul>

          {/* CHANGES */}
          <h2 className="text-2xl font-semibold mt-12">10. Modificarea termenilor</h2>
          <p>
            Termenii și Condițiile pot fi actualizați periodic. Continuarea utilizării platformei reprezintă acceptarea
            versiunii actualizate.
          </p>

          {/* CONTACT */}
          <h2 className="text-2xl font-semibold mt-12">11. Contact</h2>
          <p>
            Pentru întrebări privind acești termeni, ne poți contacta la:
          </p>

          <p className="font-medium text-gray-900">
            support@contracttransparent.com
          </p>

        </div>

      </LandingPageWidth>
    </section>
  );
}
