import { PlayCircle } from "lucide-react"
import { LandingPageWidth } from "./landing-page-width"
import { SectionHeaderContainer, SectionLabel, SectionSubtitle, SectionTitle } from "./shared"

type Props = {}

export const ProductDemo: React.FC<Props> = ({ }) => {
  return (
    <div className="py-[110px] bg-white">
      <LandingPageWidth className="flex flex-col gap-[60px]">
        <SectionHeaderContainer>
          <SectionLabel>Product demo</SectionLabel>

          <SectionTitle className="text-center max-w-[800px]">
            Contracts. Without the chaos.
          </SectionTitle>

          <SectionSubtitle className="text-center max-w-[700px]">
            Create, send, and sign contracts in one clean workflow.
          </SectionSubtitle>
        </SectionHeaderContainer>

        <section id="demo" className="max-w-6xl mx-auto w-full">
          <div className="rounded-[1rem] overflow-hidden shadow-sm">
            <div className="w-full">
              <div className="aspect-video w-full rounded-lg bg-slate-900 relative overflow-hidden border border-slate-800">

                <video controls className="h-full w-full object-contain" poster="/demo-poster.jpg" autoPlay muted playsInline>
                  <source src="/assets/pactly-demo-video.mp4" type="video/mp4" />
                </video>

                {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                    <PlayCircle size={42} className="text-white" />
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">Coming soon...</h3>
                  <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">
                    Show the full flow: create contract, send link, client opens branded page, asks questions, signs.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </LandingPageWidth>
    </div>
  )
}