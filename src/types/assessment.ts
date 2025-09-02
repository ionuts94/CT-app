export type T_AssessmentFormStep = {
  component?: React.FC<{ data: T_AssessmentFormStep }>,
  questionId: string,
  color: string,
  description: string,
  question: string,
  tooltip: string,
  choices: T_AssessmentFormChoice[]
  maxChoicesPick?: number,
  minChoicesPick?: number,
  visibleIf?: {
    questionId: string,
    value: any,
    unlocked?: boolean
  },
  enableNextStepIf?: {
    // TODO: Create logic to dinamically enable Next btn
    // based on the survey json file
  }
}

type T_AssessmentFormChoice = {
  type: 'text' | 'checkbox' | 'radio',
  label: string,
  value: number | string | boolean
}