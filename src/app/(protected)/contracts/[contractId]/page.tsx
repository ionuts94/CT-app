type Props = {
  params: Promise<{ contractId: string }>
}

export default async function CompnayViewContract({ params }: Props) {
  const { contractId } = await params

  return (
    <main>
      This is company view contract page
      Contract id: {contractId}
    </main>
  )
}