"use client";

import { ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import { Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";


type Props = {
  containerClassName?: string;
  inputClassName?: string,
  buttonClassName?: string,
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => any;
  onSubmit?: () => any;
};

export const ResizableTextInput: React.FC<Props> = ({
  containerClassName,
  inputClassName,
  buttonClassName,
  placeholder,
  disabled,
  value = "",
  onChange = () => null,
  onSubmit = () => null,
}) => {
  const isDisabled = disabled || value?.length < 1
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      const elHeight = e.target.scrollHeight;
      textareaRef.current.style.height = `${elHeight}px`;
    }
    onChange(e.target.value);
  };

  const handleButtonClick = async () => {
    if (isDisabled) return;
    if (textareaRef.current) {
      onSubmit();
      onChange("");
      textareaRef.current.style.height = "44px";
      textareaRef.current.blur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      }

      if (isDisabled) return event.preventDefault();

      onSubmit();
      event.preventDefault();
    }
  };
  return (
    <div
      className={cn(
        "w-full bg-primary-grey/50 rounded-[30px] mx-auto py-[6px] px-[18px] text-primary-black-900 font-[300] flex items-end",
        containerClassName
      )}
    >
      <textarea
        className={cn("flex items-center resize-none bg-transparent w-full h-[44px] max-h-[150px] p-[10px] outline-none border-none custom-scrollbar", inputClassName)}
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        onChange={onInputChange}
        value={value}
        placeholder={placeholder || ""}
      />
      <Button
        disabled={isDisabled}
        onClick={handleButtonClick}
        className={cn("text-white rounded-full bg-black/40 hover:bg-black/60 transition aspect-square p-2", buttonClassName)}
      >
        <Forward className="w-full h-full rotate-180" color="white" />
      </Button>
    </div>
  );
};
