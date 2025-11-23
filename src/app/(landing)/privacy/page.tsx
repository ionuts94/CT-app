"use client";

import { LandingPageWidth } from "../components/landing-page-width";

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full py-24 bg-white">
      <LandingPageWidth>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Politica de Confidențialitate
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Ultima actualizare: Ianuarie 2025
          <br />
          Această politică explică modul în care colectăm, folosim și protejăm datele tale personale.
        </p>

        {/* CONTENT */}
        <div className="prose prose-gray max-w-none leading-relaxed prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">

          <h2 className="text-2xl font-semibold mt-12">1. Introducere</h2>
          <p>
            Contract Transparent SRL („noi”, „platforma”, „serviciul”) respectă confidențialitatea
            datelor tale și se angajează să protejeze toate informațiile personale conform
            Regulamentului (UE) 2016/679 (GDPR).
          </p>

          <h2 className="text-2xl font-semibold mt-12">2. Cine suntem</h2>
          <p>
            Operatorul datelor este Contract Transparent SRL, cu sediul în România.
          </p>
          <p className="mb-0">Email responsabil cu protecția datelor:</p>
          <p className="font-medium text-gray-900">support@contracttransparent.com</p>

          <h2 className="text-2xl font-semibold mt-12">3. Ce date personale colectăm</h2>
          <p>
            Colectăm următoarele categorii de date în funcție de modul în care folosești platforma:
          </p>

          <h3 className="text-xl font-semibold mt-6">3.1. Date furnizate de utilizator</h3>
          <ul>
            <li>Nume și prenume</li>
            <li>Adresă de email</li>
            <li>Numele companiei / rol în companie</li>
            <li>Date din contracte (părți, date de contact, conținut contractual)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3.2. Date generate automat</h3>
          <ul>
            <li>Adresă IP</li>
            <li>Dispozitivul și browser-ul folosit</li>
            <li>Loguri de acces și audit (acțiuni în contracte)</li>
            <li>Timestamps pentru semnături și modificări</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3.3. Date ale clienților tăi</h3>
          <p>
            Atunci când trimiți un contract unei alte persoane, procesăm:
          </p>
          <ul>
            <li>emailul destinatarului</li>
            <li>comentarii adăugate</li>
            <li>semnături electronice</li>
            <li>istoricul acțiunilor asupra documentului</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">4. Cum folosim datele tale</h2>
          <p>Folosim datele personale doar în scopurile permise de GDPR:</p>
          <ul>
            <li>pentru a crea și gestiona contul tău</li>
            <li>pentru a trimite contracte și notificări asociate</li>
            <li>pentru a genera audit log-uri și semnături digitale</li>
            <li>pentru îmbunătățirea platformei</li>
            <li>pentru suport tehnic și asistență</li>
            <li>pentru scopuri legate de securitate și prevenirea abuzului</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">5. Baza legală a prelucrării</h2>
          <p>Temeiurile pe care ne bazăm sunt:</p>
          <ul>
            <li>executarea unui contract – atunci când folosești platforma</li>
            <li>consimțământ – pentru emailuri de marketing</li>
            <li>interes legitim – securitatea contului și prevenirea fraudelor</li>
            <li>obligație legală – păstrarea anumitor înregistrări</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12">6. Stocarea datelor</h2>
          <p>
            Datele sunt stocate pe servere sigure din Uniunea Europeană.
            Contractele și semnăturile electronice sunt păstrate conform
            perioadelor legale aplicabile, dacă legea nu impune altfel.
          </p>

          <h2 className="text-2xl font-semibold mt-12">7. Cine are acces la datele tale</h2>
          <p>
            Accesul este strict limitat:
          </p>
          <ul>
            <li>echipa Contract Transparent (numai dacă este necesar pentru suport)</li>
            <li>furnizorii noștri de infrastructură IT (conform acordurilor GDPR)</li>
            <li>parteneri care gestionează procesarea plăților</li>
          </ul>
          <p>
            Nu vindem, nu închiriem și nu cedăm datele tale unor terți în scopuri comerciale.
          </p>

          <h2 className="text-2xl font-semibold mt-12">8. Securitatea datelor</h2>
          <p>
            Folosim criptare, audit trail, controlul accesului, firewall-uri, backup-uri
            și alte măsuri pentru a proteja datele tale și ale clienților tăi.
          </p>

          <h2 className="text-2xl font-semibold mt-12">9. Drepturile tale</h2>
          <p>Conform GDPR, ai următoarele drepturi:</p>
          <ul>
            <li>dreptul de acces la date</li>
            <li>dreptul de rectificare</li>
            <li>dreptul de ștergere („dreptul de a fi uitat”)</li>
            <li>dreptul de restricționare</li>
            <li>dreptul la portabilitatea datelor</li>
            <li>dreptul de opoziție</li>
          </ul>

          <p>
            Pentru exercitarea acestor drepturi, ne poți contacta la:{" "}
            <span className="font-medium text-gray-900">support@contracttransparent.com</span>.
          </p>

          <h2 className="text-2xl font-semibold mt-12">10. Transferuri internaționale</h2>
          <p>
            În mod normal, nu transferăm date în afara UE. Dacă va fi vreodată necesar, vom folosi
            doar furnizori compatibili GDPR și Clauze Contractuale Standard.
          </p>

          <h2 className="text-2xl font-semibold mt-12">11. Cookie-uri</h2>
          <p>
            Folosim cookie-uri strict necesare pentru funcționarea platformei și cookie-uri
            opționale pentru analiză și performanță. Poți controla preferințele tale din browser.
          </p>

          <h2 className="text-2xl font-semibold mt-12">12. Modificări ale politicii</h2>
          <p>
            Politica poate fi actualizată periodic. Versiunea curentă va fi întotdeauna disponibilă
            pe această pagină.
          </p>

          <h2 className="text-2xl font-semibold mt-12">13. Contact</h2>
          <p>
            Pentru întrebări legate de protecția datelor, ne poți contacta la:
          </p>
          <p className="font-medium text-gray-900">
            support@contracttransparent.com
          </p>

        </div>

      </LandingPageWidth>
    </section>
  );
}
