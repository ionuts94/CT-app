import { CompanyStep } from "./components/company-step"

type Props = {

}

export default async function OnboardingCompanyPage() {
    return (
        <div className="flex flex-1 bg-white px-4 py-4 justify-center items-center">
            <CompanyStep />
        </div>
    )
}