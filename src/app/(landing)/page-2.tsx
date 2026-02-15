import { Benefits } from "./components/benefits";
import { FaQ } from "./components/faq";
import { FeatureHighlight } from "./components/feature-highlight";
import { FinalCta } from "./components/final-cta";
import { HowItWorks } from "./components/how-it-works";
import { LandingPageHeader } from "./components/landing-page-header";
import { LandingPageHero } from "./components/landing-page-hero";
import { PricingPlans } from "./components/pricing-plans";
import { Testimonials } from "./components/testimonials";
import { Footer } from "./components/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

export default async function LandingPage() {
  return (
    <>
      <LandingPageHero />
      <Benefits />
      <HowItWorks />
      <FeatureHighlight />
      <PricingPlans />
      <Testimonials />
      <FaQ />
      <FinalCta />
      <PageViewTracker
        path="/"
        source="linkedin_dm_v1"
      />
    </>
  )
}