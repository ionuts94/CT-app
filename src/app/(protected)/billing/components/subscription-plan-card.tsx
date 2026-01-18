import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { getPlanDetailsByPlanId } from "@/constants/plans"
import { Subscription, SubscriptionPlan, User } from "@prisma/client"
import { PlanDetails } from "./plan-details"
import { ChangePlanDialog } from "./change-plan-dialog"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"

type Props = {
  subscription?: Subscription,
  user: User
}

export const SubscriptionPlanCard: React.FC<Props> = ({ subscription, user }) => {
  const userPlanId = subscription?.plan || SubscriptionPlan.FREE
  const planAndDetails = getPlanDetailsByPlanId(userPlanId)

  return (
    <Card className="p-4 flex-row items-start">
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex flex-col gap-2">
          <Text weight="semibold">Abonamentul tau curent</Text>
          <Text size="sm" className="text-muted-foreground">Vezi ce este inclus in planul tau activ.</Text>
        </div>
        <div className="text-blue-600 py-1 bg-secondary rounded-full w-[150px] flex items-center justify-center">
          <Text weight="semibold">
            Activ
          </Text>
        </div>
        <PlanDetails plan={planAndDetails} />
        {subscription?.status === "ACTIVE" && userPlanId !== SubscriptionPlan.FREE &&
          <div className="flex flex-col gap-2">
            {subscription?.currentPeriodEnd &&
              <Text size="sm" className="text-muted-foreground">
                Urmatoarea factura:
                {new Date(subscription?.currentPeriodEnd).toLocaleDateString()}
              </Text>
            }
            <Text size="sm" className="text-muted-foreground">Email de facturare: {user.email}</Text>
          </div>
        }
      </div>

      <div className="w-1/2 flex flex-col gap-2 h-full justify-end">
        <div className="flex flex-col gap-2">
          <Text className="" weight="bold">Schimba planul</Text>
          <Text size="sm" className="text-muted-foreground">Alege un alt plan de abonament, în funcție de nevoile echipei tale.</Text>
          <div className="border-[1px] broder-border rounded-md p-4 max-w-[550px] shadow-sm flex flex-col gap-2">
            <Text size="sm" weight="semibold">Cum funcționează upgrade-ul</Text>
            <div className="help-text element-inspector-selected flex flex-col gap-2">
              <Text size="sm" className="text-muted-foreground">• Dacă faci <strong >upgrade</strong>, plătești diferența <strong>imediat</strong>, iar perioada de facturare se actualizează.<br /></Text>
              <Text size="sm" className="text-muted-foreground"> • Beneficiile noului plan (număr de contracte, featuri, membri de echipă) sunt <strong>activate imediat</strong> după schimbare.</Text>
            </div>
            <Text size="sm" className="" weight="semibold">Cum funcționează downgrade-ul</Text>
            <div className="help-text">
              <Text size="sm" className="text-muted-foreground">• Dacă faci <strong>downgrade</strong>, nu plătești nimic acum.<br /></Text>
              <Text size="sm" className="text-muted-foreground"> • Rămâi pe planul curent până la următoarea <strong>dată de facturare</strong>, când noul plan va intra în vigoare.</Text>
            </div>
            <ChangePlanDialog currentUserPlanId={userPlanId} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text size="sm" className="" weight="bold">Oprește abonamentul</Text>
          <Text size="sm" className="text-muted-foreground">Poți întrerupe abonamentul, dar vei păstra accesul până la finalul perioadei plătite.</Text>
          <div className="border-[1px] broder-border rounded-md p-4 max-w-[550px] shadow-sm flex flex-col gap-2">
            <Text size="sm" weight="semibold">Ce se întâmplă când oprești abonamentul</Text>
            <div className="help-text element-inspector-selected flex flex-col gap-2">
              <Text size="sm" className="text-muted-foreground"> • Abonamentul rămâne <strong>activ</strong> până la următoarea <strong>dată de facturare</strong>.<br /></Text>
              <Text size="sm" className="text-muted-foreground">  • După această dată, nu vei mai fi taxat și accesul la funcționalitățile plătite va fi oprit.</Text>
            </div>
            <CancelSubscriptionDialog />
          </div>
        </div>
      </div>
    </Card>
  )
}