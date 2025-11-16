import { Footer } from "react-day-picker";
import { Benefits } from "./components/benefits";
import { FaQ } from "./components/faq";
import { FeatureHighlight } from "./components/feature-highlight";
import { FinalCta } from "./components/final-cta";
import { HowItWorks } from "./components/how-it-works";
import { LandingPageHeader } from "./components/landing-page-header";
import { LandingPageHero } from "./components/landing-page-hero";
import { PricingPlans } from "./components/pricing-plans";
import { Testimonials } from "./components/testimonials";
import { LandingPageWidth } from "./components/landing-page-width";

export default async function LandingPage() {
  return (
    <>
      <LandingPageHeader />
      <LandingPageHero />
      <Benefits />
      <HowItWorks />
      <FeatureHighlight />
      <PricingPlans />
      <Testimonials />
      <FaQ />
      <FinalCta />
      <Footer />
    </>
  )
}