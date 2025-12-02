import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function base64ToFile(base64Data: string, filename: string) {
  const res = await fetch(base64Data);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}