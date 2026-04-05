import { Input } from "@/components/form-elements"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { useTemplateVariables, VariableField } from "@/hooks/use-template-variables"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"
import { ReviewVariablesDialog } from "./review-variables-dialog"
import { UseFormReturn } from "react-hook-form"
import { T_ContractPayload } from "@/validators/contract.validator"

type Props = {
  form: UseFormReturn<T_ContractPayload>
}

export const TemplateVariables: React.FC<Props> = ({ form }) => {
  const { extractTemplateVariables, annotateTemplateVariables, replaceTemplateVariables } = useTemplateVariables()

  const formValues = form ? form.watch() : null;
  const variables = extractTemplateVariables(formValues?.content || "")

  const hasVariables = variables.length > 0

  const getInitialState = (variables: VariableField[]) => {
    const initialValues: Record<string, string> = {}
    variables.forEach(variable => {
      initialValues[variable.key] = ""
    })
    return initialValues
  }

  const [values, setValues] = useState(() => getInitialState(variables))

  const handleInputChange = (key: string, value: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [key]: value
    }))
  }

  const resetValues = () => {
    setValues(getInitialState(variables))
  }

  const validate = () => {
    for (const variable of variables) {
      if (!values[variable.key]) {
        return false
      }
    }
    return true
  }

  const handleApplyChanges = () => {
    if (!validate()) {
      toast.error("Please fill all variable values before applying changes.")
      return;
    }
    const newContent = replaceTemplateVariables(formValues?.content || "", values)
    form.setValue("content", newContent)
    toast.success("Template variables applied successfully!")
  }

  const isFormFilled = validate()

  if (!hasVariables) {
    return <div>
      <div className="flex items-center justify-between border-b px-4 pb-2">
        <div className="flex gap-2 items-center">
          <span className="text-[#1d4ed8] font-bold text-[18px]">{'{ }'}</span>
          <Text weight="medium" size="lg" className="mt-1">Template variables</Text>
        </div>
        <Text weight="medium" size="sm" className="text-[#1d4ed8] bg-[#eef2ff] w-fit px-3 py-1 rounded-full">{variables.length} detected</Text>
      </div>
      <div className="px-4 flex pt-2 flex-col gap-2">
        <Text size="sm" className="text-muted-foreground italic">No template variables detected</Text>
      </div>
    </div>
  }


  return (
    <div>
      <div className="flex items-center justify-between border-b px-4 pb-2">
        <div className="flex gap-2 items-center">
          <span className="text-[#1d4ed8] font-bold text-[18px]">{'{ }'}</span>
          <Text weight="medium" size="lg" className="mt-1">Template variables</Text>
        </div>
        <Text weight="medium" size="sm" className="text-[#1d4ed8] bg-[#eef2ff] w-fit px-3 py-1 rounded-full">{variables.length} detected</Text>
      </div>
      <div className="px-4 flex pt-2 flex-col gap-2">
        <Text size="sm" weight="medium">Detected variables in this template</Text>
        <Text size="sm" className="text-muted-foreground">
          Fill the values below to automatically replace all variables in the contract.
          Each value will be applied wherever the variable appears.
        </Text>
      </div>

      {variables.length > 0 && (
        <div className="px-4 mt-4 flex flex-col gap-5">
          {variables.map(variable => (
            <div key={variable.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 justify-between w-full">
                  <span className="text-sm text-[#1d4ed8] font-medium">{`{{ ${variable.key} }}`}</span>
                  <Text size="sm" className="text-muted-foreground">Used {variable.occurrences} {variable.occurrences > 1 ? 'times' : 'time'}</Text>
                </div>
              </div>
              <Input
                className={cn("border-2 border-yellow-500", values[variable.key] && "border-2 border-green-500")}
                placeholder={`Value for ${variable.key}`}
                value={values[variable.key]}
                onChange={e => handleInputChange(variable.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <Text size="sm" className="text-muted-foreground px-4 mt-4">
        You need to fill all the variable values before applying the changes.
      </Text>
      <div className="px-4 mt-4">
        {/* <Button onClick={handleApplyChanges} disabled={!isFormFilled}>Apply changes</Button> */}
        <ReviewVariablesDialog
          disabled={!isFormFilled}
          content={replaceTemplateVariables(annotateTemplateVariables(formValues?.content || ""), values)}
          onConfirm={handleApplyChanges}
        />
        <Button onClick={resetValues} variant="outline" className="ml-2">Reset values</Button>
      </div>
    </div>
  )
}