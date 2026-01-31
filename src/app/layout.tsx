import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/contexts/user-context";
import { TanstackProvider } from "@/contexts/tanstack-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pactly — Clear contracts. Confident decisions.",
  description: "Create, send, and sign contracts with clarity.",
  openGraph: {
    title: "Pactly",
    description: "Clear contracts. Confident decisions.",
    url: "https://pactly.co.uk",
    siteName: "Pactly",
    images: [
      {
        url: "https://pactly.co.uk/assets/logo/og_image.png",
        width: 1200,
        height: 630,
        alt: "Pactly",
      },
    ],
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-app`}
      >
        <TanstackProvider>
          {children}
          <Toaster richColors position="top-center" />
        </TanstackProvider>
      </body>
    </html>
  );
}


const colors = {
  "background": "#fff",
  "foreground": "#0f172a",
  "border": "#e6e9ee",
  "input": "#f7f8fa",
  "primary": "#0ea5e9",
  "primary-foreground": "#ffffff",
  "secondary": "#eff8ff",
  "secondary-foreground": "#0369a1",
  "muted": "#e6eef4",
  "muted-foreground": "#475569",
  "success": "#10b981",
  "success-foreground": "#ffffff",
  "accent": "#0ea5e9",
  "accent-foreground": "#ffffff",
  "destructive": "#ef4444",
  "destructive-foreground": "#ffffff",
  "warning": "#f59e0b",
  "warning-foreground": "#ffffff",
  "card": "#ffffff",
  "card-foreground": "#0f172a",
  "sidebar": "#ffffff",
  "sidebar-foreground": "#374151",
  "sidebar-primary": "#e5e7eb",
  "sidebar-primary-foreground": "#0f172a"
}