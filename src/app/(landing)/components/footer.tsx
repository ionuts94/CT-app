import Link from "next/link"

type Props = {

}

export const Footer: React.FC<Props> = ({ }) => {
  return (
    <footer className="w-full  border-t border-gray-200 py-12 bg-[rgb(18,20,29)] relative">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-2xl font-semibold text-white">
              Contract Transparent
            </h3>
            <p className="text-white mt-3 text-md max-w-sm">
              Platformă modernă pentru trimiterea și semnarea contractelor
              într-un mod clar, sigur și complet transparent.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-3">Produs</h4>
            <ul className="space-y-2 text-md">
              <li><Link href="#howitworks" className="text-white hover:text-white">Funcționalități</Link></li>
              <li><Link href="#pricing" className="text-white hover:text-white">Prețuri</Link></li>
              <li><Link href="#faq" className="text-white hover:text-white">Întrebări frecvente</Link></li>
              <li><Link href="/security" className="text-white hover:text-white">Securitate</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xl">Suport</h4>
            <ul className="space-y-2 text-md">
              <li><Link href="/contact" className="text-white hover:text-white">Contact</Link></li>
              <li>
                <Link
                  href="mailto:support@contracttransparent.com"
                  className="text-white hover:text-white"
                >
                  support@contracttransparent.com
                </Link>
              </li>
              <li><Link href="/tos" className="text-white hover:text-white">Termeni și condiții</Link></li>
              <li><Link href="/privacy" className="text-white hover:text-white">Politica de confidențialitate</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white flex flex-col sm:flex-row justify-between items-center text-md text-white">
          <p>© {new Date().getFullYear()} Contract Transparent. Toate drepturile rezervate.</p>
          <p className="mt-2 sm:mt-0">
            Made with ❤️ in România
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 size-[64px] bg-blue-900 rounded-full blur-[50px]" />
      <div className="absolute top-10 right-10 size-[64px] bg-blue-900 rounded-full blur-[60px]" />
    </footer>
  )
}