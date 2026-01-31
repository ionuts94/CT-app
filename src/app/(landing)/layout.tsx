import { PropsWithChildren } from "react";
import "./landing.css"
import { LandingPageHeader } from "./components/landing-page-header";
import { Footer } from "./components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pactly — Clear contracts. Confident decisions.",
  description:
    "Pactly helps you create, send, and sign contracts with clarity. Comment on clauses, confirm understanding, and avoid disputes — before anyone signs."
}


export default async function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingPageHeader />
      {children}
      <Footer />
    </>
  )
}