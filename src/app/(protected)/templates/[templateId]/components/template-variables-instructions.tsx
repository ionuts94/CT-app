import { Text } from "@/components/topography"

type Props = {

}

export const TemplateVariablesIntructions: React.FC<Props> = ({ }) => {
  return (
    <div>
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-primary font-bold text-[18px]">{'{ }'}</span>
          <Text weight="medium" size="lg" className="text-muted-foreground mt-1">Template variables</Text>
        </div>
        <div className="mt-2">
          <Text className="text-muted-foreground">You can use template variables to create dynamic contracts. Template variables are placeholders that will be replaced with actual values when the contract is generated.</Text>
          <Text className="text-muted-foreground mt-2">To use a template variable, simply include it in your template content using double curly braces. For example: <span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ client_name }}'}</span>.</Text>
          <Text className="text-muted-foreground mt-2">When a contract is created from this template, the <span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ client_name }}'}</span> variable will be replaced with the actual name of the client.</Text>
        </div>
      </div>
      <div className="mt-4">
        <Text className="text-muted-foreground">You can use any variable name you want, as long as it is enclosed in double curly braces. You can also use the same variable multiple times in your template, and it will be replaced with the same value each time.</Text>
        <Text className="text-muted-foreground mt-2">Template variables are a powerful way to create dynamic and personalized contracts. Use them to make your contracts more flexible and adaptable to different situations.</Text>
      </div>
      <div className="mt-4">
        <Text className="text-muted-foreground">Here are some examples of how you can use template variables:</Text>
        <ul className="list-disc list-inside mt-2 text-muted-foreground">
          <li><span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ client_name }}'}</span>: The name of the client.</li>
          <li><span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ project_name }}'}</span>: The name of the project.</li>
          <li><span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ contract_date }}'}</span>: The date the contract was created.</li>
          <li><span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ total_amount }}'}</span>: The total amount of the contract.</li>
        </ul>
      </div>
      <div className="mt-4">
        <Text className="text-muted-foreground">You can also combine template variables with static text to create more complex and personalized contracts. For example:</Text>
        <div className="mt-2 p-4 bg-muted rounded">
          <Text className="text-muted-foreground">Dear <span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ client_name }}'}</span>,</Text>
          <Text className="text-muted-foreground mt-2">We are pleased to inform you that your project, <span className="font-mono bg-muted px-1 py-0.5 rounded">{'{{ project_name }}'}</span>, has been approved.</Text>
        </div>
      </div>
    </div>
  )
}