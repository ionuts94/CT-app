import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { SignUpForm } from "./components/sign-up-form";

export default async function SignUpPage() {
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <SignUpForm />
            <PageViewTracker
                path="/sign-up"
                source="linkedin_dm_v1"
            />
        </main>
    )
}