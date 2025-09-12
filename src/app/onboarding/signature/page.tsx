import { SignatureStep } from "./components/signature-step";


export default async function OnboardingSignaturePage() {
    return (
        <div className="flex flex-1 bg-white px-4 py-4 justify-center items-center">
            <SignatureStep />
        </div>
    )
}