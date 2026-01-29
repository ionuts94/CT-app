"use client"

import { cn } from "@/lib/utils"
import { ChangeEvent, useState } from "react"
import { Input } from "./form-elements"
import { UploadCloudIcon } from "lucide-react"
import { Text } from "./topography"
import Image from "next/image"

type Props = {
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => any,
    placeholder?: string,
    defaultPreviewUrl?: string,
    className?: string,
    fillMode?: "cover" | "contain"
}

export const InputImage: React.FC<Props> = ({
    onImageChange = () => null,
    defaultPreviewUrl = "",
    placeholder = "Upload image",
    className,
    fillMode = "contain"
}) => {
    const [hoverInput, setHoverInput] = useState(false)
    const [imagePreviewUrl, setImagePreviewUrl] = useState("")

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const previewUrl = URL.createObjectURL(file)
        setImagePreviewUrl(previewUrl)
        onImageChange(e)
    }

    return (
        <div
            className={cn(
                "w-full aspect-square lg:aspect-square bg-muted/60 rounded-xl text-color-secondary flex items-center justify-center gap-2 flex-col relative",
                hoverInput &&
                "opacity-70 border-[2px] border-dashed border-black/80",
                className
            )}
        >
            <Input
                type="file"
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                onMouseEnter={() => setHoverInput(true)}
                onMouseLeave={() => setHoverInput(false)}
                onChange={handleImageChange}
            />

            {imagePreviewUrl || defaultPreviewUrl ? (
                <Image
                    src={imagePreviewUrl || defaultPreviewUrl}
                    alt="Logo preview"
                    fill
                    style={{ objectFit: fillMode }}
                />
            ) : (
                <>
                    <UploadCloudIcon strokeWidth={3} />
                    <Text weight="semibold">{placeholder}</Text>
                </>
            )}
        </div>
    )
}