"use client"

import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"
import { useTemplateContext } from "@/contexts/template-assistant-context"
import { useState } from "react"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { ContractFixOutputSelective, TemplateReviewOutput } from "@/types/services/ai/templates"


type Props = {

}

export const AiTemplateReview: React.FC<Props> = ({ }) => {
  const [reviewOutcome, setReviewOutcome] = useState<TemplateReviewOutput>()
  const [fixerOutcome, setFixerOutcome] = useState<ContractFixOutputSelective>()

  const {
    templateInputs,
    currentTemplateRichText,
    setCurrentTemplateRichText,
    aiReviewLoading,
    runAITemplateReview,
    aiFixLoading,
    runAIFixTemplate,
  } = useTemplateContext()

  // useEffect(() => {
  //   (async () => {
  //     if (!templateInputs || !currentTemplateRichText) return;
  //     const { reviewData, error } = await runAITemplateReview({
  //       initialInput: templateInputs,
  //       templateRichTextString: currentTemplateRichText
  //     })

  //     if (reviewData) {
  //       setReviewOutcome(reviewData)
  //       setCurrentTemplateRichText(reviewData.normalizedHtml)
  //     }
  //   })()
  // }, [templateInputs, currentTemplateRichText])

  const handleApplyFixes = async () => {
    if (!reviewOutcome) {
      return;
    }


    const { fixedData } = await runAIFixTemplate({
      baseInput: templateInputs,
      baseHtml: currentTemplateRichText,
      issues: reviewOutcome?.issues
    })
  }


  return (
    <Card className="p-4 flex flex-col gap-2">
      <Text size="xl" weight="semibold">AI Review</Text>
      {
        aiReviewLoading && (
          <div>
            <Text>Analizam sablonul...</Text>
          </div>
        )
      }
      {
        !aiReviewLoading && reviewOutcome && (
          <div>
            <Text>{reviewOutcome.summary}</Text>
            {reviewOutcome.issues.map((issue, index) => (
              <div key={index}>
                <div>{issue.severity}</div>
                <div>{JSON.stringify(issue, null, 2)}</div>
              </div>
            ))}
          </div>
        )
      }

      <ButtonWithLoading type="button" onClick={handleApplyFixes} loading={aiFixLoading}>
        Fix my template
      </ButtonWithLoading>
    </Card>
  )
}