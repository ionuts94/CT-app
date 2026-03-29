"use client"

import { TextCTA } from "@/components/topography/cta"
import { Text } from "@/components/topography"

export default function LoadingContractPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center relative">
      <div className="text-primary flex items-center gap-2 absolute top-0 left-0 justify-center w-full py-4 border-b shadow-sm">
        <Text size="lg" weight="extrabold" className="uppercase leading-4">
          Pactly
        </Text>
      </div>

      <video
        src="./assets/lotties/Files.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-[150px]"
      />

      <TextCTA>Loading contract…</TextCTA>
    </div>
  )
}
