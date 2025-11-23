import { PropsWithChildren } from "react";
import "./landing.css"
import { LandingPageHeader } from "./components/landing-page-header";
import { Footer } from "./components/footer";

export default async function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingPageHeader />
      {children}
      <Footer />
    </>
  )
}