import { AffiliatesKPIS } from "./affiliates-kpis"
import { AffiliatesPageHeader } from "./page-header"
import { ReferralsTable } from "./referrals-table"

type Props = {

}

export const AffiliateDashboard: React.FC<Props> = ({ }) => {
    return (
        <div className="flex flex-col gap-6">
            <AffiliatesPageHeader />
            <AffiliatesKPIS />
            <ReferralsTable />
        </div>
    )
}