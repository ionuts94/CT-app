import { PactlyLogo } from "@/components/logo"
import Link from "next/link"

type Props = {}

export const Footer: React.FC<Props> = ({ }) => {
  return (
    <footer className="w-full border-t border-gray-200 py-12 bg-[rgb(18,20,29)] relative">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <PactlyLogo variant="dark" className="h-[40px]" />
            <p className="text-white mt-3 text-md max-w-sm">
              A modern platform for creating, sending, and signing contracts
              with clarity, security, and full transparency.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-3">Product</h4>
            <ul className="space-y-2 text-md">
              <li>
                <Link href="#howitworks" className="text-white hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-white hover:text-white">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xl">Support</h4>
            <ul className="space-y-2 text-md">
              <li>
                <Link href="/contact" className="text-white hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:support@pactly.co.uk"
                  className="text-white hover:text-white"
                >
                  support@pactly.co.uk
                </Link>
              </li>
              <li>
                <Link href="/tos" className="text-white hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white flex flex-col sm:flex-row justify-between items-center text-md text-white">
          <p>
            © {new Date().getFullYear()} Pactly. All rights reserved.
          </p>
          {/* <p className="mt-2 sm:mt-0">
            Made with ❤️ in Romania
          </p> */}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 size-[64px] bg-blue-900 rounded-full blur-[50px]" />
      <div className="absolute top-10 right-10 size-[64px] bg-blue-900 rounded-full blur-[60px]" />
    </footer>
  )
}
