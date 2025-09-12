import { useOnboardingContext } from "@/contexts/onboarding-context"
import { cn } from "@/lib/utils"
import { ReceiptText } from "lucide-react"
import { T_StepItem } from "./stepts"
import { Separator } from "@/components/ui/separator"
import { Fragment } from "react"

type Props = {

}

export const OnboardingHeader: React.FC<Props> = ({ }) => {
	const { steps, isCurrentStep, isStepCompleted } = useOnboardingContext()

	return (
		<div className="h-18 border-b border-border flex items-center p-4 justify-between">
			<div className="text-primary font-bold flex flex-row gap-2">
				<ReceiptText size={30} />
			</div>
			<div className="flex gap-4 items-center">
				{steps.map((step, index) => (
					<Fragment key={index}>
						<HeaderStep
							step={step}
							stepIndex={index + 1}
							isCurrentStep={isCurrentStep(step)}
							isStepCompleted={isStepCompleted(step)}
						/>
						{index < steps.length - 1 &&
							<Separator className="!w-[1.5vw] !h-[2px]" />
						}
					</Fragment>
				))}
			</div>
			<div className="hidden lg:block lg:w-[10px]" />
		</div>
	)
}


type HeaderStepProps = {
	stepIndex: number,
	step: T_StepItem,
	isCurrentStep: boolean,
	isStepCompleted: boolean
}

const HeaderStep: React.FC<HeaderStepProps> = ({ stepIndex, step, isCurrentStep, isStepCompleted }) => {
	return (
		<div className="flex items-center gap-2">
			<div
				className={cn(
					"rounded-full size-7 text-color-secondary/70 border-3 border-color-secondary/70 flex items-center justify-center text-[16px] font-bold lg:size-8",
					isCurrentStep && "text-primary border-primary",
					isStepCompleted && "border-primary bg-primary text-white",
				)}
			>
				{stepIndex}
			</div>
			<p
				className={cn(
					"hidden font-semibold text-color-secondary lg:block",
					isCurrentStep && "font-bold text-black"
				)}
			>
				{step.name.toUpperCase()}
			</p>
		</div>
	)
}