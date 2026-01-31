import { Check } from "lucide-react"
import Link from "next/link"

type Props = {
  planName?: string
  validUntil?: string
  amount?: string
}

export default async function PaymentSuccessCard({
  planName = "Team",
  validUntil = "30 Nov 2025",
  amount = "€89 / month",
}: Props) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100">
          <Check className="text-green-600" size={28} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment successful!
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-6">
          Your Pactly subscription has been updated. We’ve also sent you an email
          with your payment details.
        </p>

        {/* Summary box */}
        <div className="rounded-xl bg-gray-50 p-4 text-left text-sm mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Active plan</span>
            <span className="font-medium text-gray-900">{planName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Valid until</span>
            <span className="font-medium text-gray-900">{validUntil}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount paid</span>
            <span className="font-medium text-gray-900">{amount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contracts"
            className="inline-flex justify-center rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Go to dashboard
          </Link>

          <Link
            href="/billing"
            className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            View billing details
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-gray-500">
          If you don’t recognize this payment, please contact us immediately at{" "}
          <a
            href="mailto:support@pactly.app"
            className="text-blue-600 hover:underline"
          >
            support@pactly.app
          </a>
          .
        </p>
      </div>
    </div>
  )
}
