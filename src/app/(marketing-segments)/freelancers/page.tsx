// app/(marketing)/freelanceri/page.tsx

import Link from "next/link"

export default function FreelanceriLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              CT
            </span>
            <span>Contract Transparent</span>
          </Link>

          <nav className="flex items-center gap-2">
            <a
              href="#cum-functioneaza"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              Cum funcționează
            </a>
            <a
              href="#beneficii"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              Beneficii
            </a>
            <a
              href="#preturi"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 md:inline-flex"
            >
              Prețuri
            </a>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Încearcă gratuit
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Pentru freelanceri & colaborări B2B
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Trimite contracte profesioniste, fără stres și fără emailuri
                interminabile.
              </h1>

              <p className="text-lg leading-relaxed text-slate-600">
                Contract Transparent te ajută să creezi, trimiți și semnezi
                contracte într-un singur loc. Ai{" "}
                <span className="font-medium text-primary">
                  audit, arhivă, remindere
                </span>{" "}
                și un proces clar — ca să fii acoperit înainte și după semnare.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Încearcă gratuit (3 contracte)
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Am deja cont
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 text-sm">
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">3 contracte</p>
                  <p className="text-slate-600">gratis, o singură dată</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">Audit & istoric</p>
                  <p className="text-slate-600">pentru fiecare acțiune</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="font-semibold">Arhivă</p>
                  <p className="text-slate-600">organizată automat</p>
                </div>
              </div>
            </div>

            {/* Right-side "mock" card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Exemplu: contract de colaborare
                  </p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    DRAFT
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Colaborare servicii</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Client: SC Exemplu SRL
                    <br />
                    Freelancer: Prenume Nume
                  </p>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Semnături</span>
                      <span className="font-medium">2 / 2</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Termen semnare</span>
                      <span className="font-medium">—</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">Expiră</span>
                      <span className="font-medium">31 ian</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      Trimite spre semnare
                    </button>
                    <button className="w-full rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                      Salvează draft
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Ce câștigi ca freelancer</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>• Mai puține follow-up-uri și emailuri pierdute</li>
                    <li>• Proces profesionist în fața clientului</li>
                    <li>• Istoric clar dacă apar neînțelegeri</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Pain */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">
                Dacă trimiți contracte prin PDF + email, faci multă muncă invizibilă.
              </h2>
              <p className="text-slate-600">
                Nu concurăm cu Word sau Google Docs. Concurăm cu tot ce se întâmplă
                după ce ai exportat PDF-ul: trimiteri, follow-up, versiuni, arhivă,
                termene și încrederea clientului.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  title: "Follow-up manual",
                  desc: "„Ai apucat să semnezi?” — încă un email, încă un reminder.",
                },
                {
                  title: "Versiuni confuze",
                  desc: "V2_final_final.pdf și discuții fără istoric clar.",
                },
                {
                  title: "Arhivă împrăștiată",
                  desc: "Contracte în email, drive, desktop — greu de găsit la nevoie.",
                },
                {
                  title: "Termene uitate",
                  desc: "Deadline de semnare, expirare, prelungiri — pe post-it sau în cap.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficii" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">
              Pentru freelanceri: claritate, control și încredere.
            </h2>
            <p className="max-w-3xl text-slate-600">
              Contract Transparent îți organizează procesul complet: de la draft, la
              semnare, până la arhivare și termene. Clientul vede un proces
              profesionist, tu ai dovada clară a fiecărui pas.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Audit & istoric",
                desc: "Fiecare acțiune e înregistrată: cine a văzut, cine a semnat, când și ce s-a schimbat.",
              },
              {
                title: "Remindere automate",
                desc: "Setezi termen de semnare sau expirare. Noi trimitem notificări înainte de deadline.",
              },
              {
                title: "Arhivă organizată",
                desc: "Toate contractele tale într-un singur loc: căutare rapidă, statusuri, versiuni.",
              },
              {
                title: "Încredere pentru client",
                desc: "Clientul primește acces la contract și audit, fără să caute în emailuri.",
              },
              {
                title: "Semnături & flux clar",
                desc: "Trimiți spre semnare, urmărești statusul și închizi colaborarea fără haos.",
              },
              {
                title: "Asistent AI (opțional)",
                desc: "Clientul poate înțelege mai ușor clauzele. Tu economisești timp pe explicații repetitive.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-semibold">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cum-functioneaza" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">Cum funcționează</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Totul e gândit să fie rapid și profesionist, chiar dacă ai doar câteva
            contracte pe lună.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Creezi sau pornești dintr-un șablon",
                desc: "În câteva minute ai un contract clar, fără să te pierzi în versiuni.",
              },
              {
                step: "2",
                title: "Trimiți spre semnare",
                desc: "Clientul primește un link sigur, poate citi și semna fără pași complicați.",
              },
              {
                step: "3",
                title: "Urmărești și arhivezi automat",
                desc: "Vezi statusul în timp real. Contractul rămâne în arhivă cu audit complet.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {s.step}
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold">Tip rapid pentru freelanceri</p>
            <p className="mt-1 text-sm text-slate-600">
              Dacă lucrezi cu clienți diferiți, pornește dintr-un șablon și schimbă
              doar detaliile. În 2–3 minute poți trimite un contract nou.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preturi" className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Prețuri pentru freelanceri</h2>
            <p className="max-w-3xl text-slate-600">
              Începi cu 3 contracte gratuite (o singură dată). Apoi alegi: plătești
              per contract sau pe lună. Simplu, fără surprize.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* Trial */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">Trial</p>
              <p className="mt-2 text-4xl font-semibold">0€</p>
              <p className="mt-1 text-sm text-slate-600">
                3 contracte gratuite, o singură dată.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Acces complet la platformă</li>
                <li>• Audit & arhivă</li>
                <li>• Semnare rapidă</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Începe acum
              </Link>
            </div>

            {/* PAYG */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">Pay as you go</p>
              <p className="mt-2 text-4xl font-semibold">5€</p>
              <p className="mt-1 text-sm text-slate-600">per contract trimis</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Ideal dacă trimiți rar contracte</li>
                <li>• Fără abonament</li>
                <li>• Audit & arhivă incluse</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Alege PayG
              </Link>
              <p className="mt-3 text-xs text-slate-500">
                Tip: dacă trimiți constant, abonamentul devine mai avantajos.
              </p>
            </div>

            {/* Starter */}
            <div className="relative rounded-2xl border border-primary bg-white p-6 shadow-sm">
              <div className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Recomandat pentru freelanceri
              </div>
              <p className="text-sm font-semibold text-slate-700">Starter</p>
              <p className="mt-2 text-4xl font-semibold">15€</p>
              <p className="mt-1 text-sm text-slate-600">pe lună • 5 contracte</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• 5 contracte incluse / lună</li>
                <li>• Audit complet + arhivă</li>
                <li>• Remindere pentru deadline/expirare</li>
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Pornește cu Starter
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold">Ce primești în fiecare plan</p>
            <p className="mt-1 text-sm text-slate-600">
              Contract Transparent include audit, istoric, arhivă și un proces
              verificabil — astfel încât tu și clientul tău să aveți claritate înainte
              și după semnare.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">Întrebări frecvente</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Pot folosi Contract Transparent dacă am deja șabloane în Word/PDF?",
                a: "Da. Poți porni dintr-un șablon existent (import) sau poți crea unul direct în platformă. Important este procesul de trimitere, semnare și audit.",
              },
              {
                q: "Clientul meu trebuie să își facă cont?",
                a: "În mod normal, nu. Clientul primește un link sigur pentru a vedea și semna contractul, fără pași complicați.",
              },
              {
                q: "Ce se întâmplă după semnare?",
                a: "Contractul rămâne în arhivă, cu audit complet. Poți reveni oricând la el, iar clientul are acces la aceeași versiune finală.",
              },
              {
                q: "Pot seta deadline de semnare sau expirare?",
                a: "Da. Setezi termene, iar noi trimitem remindere înainte de deadline/expirare (în funcție de plan).",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-semibold">
                  Începe cu 3 contracte gratuite.
                </h3>
                <p className="mt-2 text-slate-600">
                  Testezi produsul complet. Dacă îți place, continui cu Pay-as-you-go
                  sau abonament. Simplu.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Creează cont gratuit
                </Link>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Vorbește cu noi
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} Contract Transparent</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary">
                Politica de confidențialitate
              </Link>
              <Link href="/tos" className="hover:text-primary">
                Termeni și condiții
              </Link>
              <Link href="/security" className="hover:text-primary">
                Securitate
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
