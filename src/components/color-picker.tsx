"use client"
import { cn } from "@/lib/utils"
import { useRef } from "react"

type Props = {
	value: string
	onChange: (val: string) => void,
	className?: string
}

export const ColorPicker: React.FC<Props> = ({ value, onChange, className }) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleClick = () => {
		inputRef.current?.click()
	}

	return (

		<div
			onClick={handleClick}
			className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 relative", className)}
		>
			<div
				className="w-5 h-5 rounded"
				style={{ backgroundColor: value }}
			/>
			<span className="font-mono text-sm">{value}</span>
			<input
				ref={inputRef}
				type="color"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-0 w-0 opacity-0 pointer-events-none fixed top-[50%] left-[50%] !translate-y-[-130px] !translate-x-[-130px]"
			/>
		</div>
	)
}