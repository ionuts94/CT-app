import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SignaturesFetchError() {
  return (
    <div className="flex pt-[20%] flex-col items-center justify-center gap-2 py-8 text-center">
      <Text className="text-lg font-semibold">
        Houston, we have a problem 🚀
      </Text>

      <Text className="text-sm text-muted-foreground max-w-md">
        We tried to load your signatures, but they didn’t make it back in time.
        They’re safe — our system just needs a moment to catch its breath.
      </Text>

      <Text className="text-sm text-muted-foreground">
        Please try again in a few seconds.
      </Text>
      <Link href="/contracts" className="mt-2">
        <Button>
          <TextCTA>
            Go back
          </TextCTA>
        </Button>
      </Link>
    </div>
  )
}
