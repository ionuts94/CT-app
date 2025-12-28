import { Card } from "@/components/ui/card"
import { ReceiptText } from "lucide-react"
import { Body, H2, Text } from "@/components/topography"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { TextCTA } from "@/components/topography/cta"
import { useState } from "react"
import CTAuth from "@/sdk/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useCountdown } from "@/hooks/use-countdown"
import { cn } from "@/lib/utils"

type Props = {
  email: string
}

export const ConfirmOTPWindow: React.FC<Props> = ({ email }) => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessingResend, setIsProcessingResend] = useState(false)

  const {
    isActive: isCountdownActive,
    secondsLeft,
    reset,
    start
  } = useCountdown(60)

  const isButtonDisabled = isProcessing || value.length < 6
  const isResetOTPDisabled = isProcessing || isCountdownActive

  const handleVerify = async () => {
    setIsProcessing(true)
    const { data, error } = await CTAuth.verifyOTP({ email, token: value })
    setIsProcessing(false)
    if (!data || error) {
      return toast.error("Codul introdus este invalid sau a expirat. Te rugăm să încerci din nou.")
    }

    toast.success("Contul a fost confirmat cu succes.")
    router.push("/onboarding/company")
  }

  const handleResendOTP = async () => {
    setIsProcessingResend(true)
    const { error } = await CTAuth.resendOTP({ email })
    setIsProcessingResend(false)
    if (error) return toast.error("Nu am putut retrimite codul momentan. Te rugăm să încerci din nou.")
    start()
    toast.success("Am trimis un nou cod de verificare.")
  }

  return (
    <Card className="w-full max-w-[800px] p-4">
      <div className="text-primary font-bold flex gap-2 items-center">
        <ReceiptText size={30} />
        <Text className="text-black text-md font-semibold">CONTRACT TRANSPARENT</Text>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4">
          <H2>Introdu codul de verificare</H2>
          <Body className="text-color-secondary">
            Ți-am trimis un cod de verificare pe adresa de email.
            Introdu codul mai jos pentru a confirma contul și a continua configurarea.
          </Body>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Text weight="semibold">Cod de verificare</Text>
            <Text className="text-color-secondary">Codul este valabil pentru o perioadă limitată.</Text>
          </div>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="flex gap-2">
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={0} />
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={1} />
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={2} />
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={3} />
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={4} />
              <InputOTPSlot className="border-black/40 border-l-[1px] size-10 text-[16px] rounded-md bg-slate-100/40" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div>
            <Text>
              Nu ai primit codul?
              <button
                disabled={isResetOTPDisabled}
                onClick={handleResendOTP}
                className="ml-1 text-primary cursor-pointer hover:text-blue-600 disabled:opacity-40 disabled:hover:text-primary"
              >
                Retrimite codul
              </button>
            </Text>
            <Text className={cn("text-color-secondary invisible", isCountdownActive && "visible")} size="sm">
              Poți retrimite codul în {secondsLeft} secunde.
            </Text>
          </div>
        </div>
        <ButtonWithLoading
          loading={isProcessing}
          disabled={isButtonDisabled}
          className="py-4 block w-fit px-8"
          onClick={handleVerify}
        >
          <TextCTA>
            Confirmă contul
          </TextCTA>
        </ButtonWithLoading>
      </div>
    </Card>
  )
}