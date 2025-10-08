"use client"

import { Comment } from "@/components/comment"
import { ResizableTextInput } from "@/components/resizable-text-input"
import { Text } from "@/components/topography"
import { cn } from "@/lib/utils"

type Props = {

}

export const CommentsSection: React.FC<Props> = ({ }) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full py-4 border-b mb-2">
        <Text weight="bold">Comentarii</Text>
        <Text weight="bold" size="sm" className="text-black/70">Vizibile ambelor parti</Text>
      </div>
      <div className={cn("w-full pb-4 px-[10px] lg:px-0 mt-4")}>
        <ResizableTextInput
          value={""}
          disabled={false}
          onChange={() => null}
          onSubmit={() => null}
          containerClassName="bg-input border mx-auto rounded-lg px-[4px] pr-[8px] py-[2px] items-center focus:outline-primary"
          buttonClassName="size-8"
          placeholder="Adauga un comentariu"
        />
      </div>
      <div className="flex flex-col gap-4">
        {COMMENTS.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  )
}

const COMMENTS = [
  {
    firstName: "Fane",
    lastName: "Barosu",
    label: "Destinatar",
    createdAt: new Date(),
    imageUrl: "",
    content: "Salut. Puteti sa imi dati mai multe detalii despre cele 12 luni obligatorii de gazduire?"
  },
  {
    firstName: "Grigore",
    lastName: "Ureche",
    label: "Companie",
    createdAt: new Date(),
    imageUrl: "",
    content: "Buna ziua. Trebuie sa platiti 12 luni de gazduire obligatoriu. Daca hotarati sa rezilitati contractul mai devreme de 12 luni trebuie sa platiti suma ramasa."
  },
  {
    firstName: "Fane",
    lastName: "Barosu",
    label: "Destinatar",
    createdAt: new Date(),
    imageUrl: "",
    content: "Nu prea imi convine treaba asta."
  },
  {
    firstName: "Asistent",
    lastName: "AI",
    label: "System",
    createdAt: new Date(),
    imageUrl: "",
    content: "Contractul a fost modificat de la 12 luni de plata obligatorie la 6 luni de plata obligatorie"
  },
]