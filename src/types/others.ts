import { STROKE_WIDTH } from "@/constants/svgs"

export type T_GradientDirection = 'to right'
  | 'to left'
  | 'to top'
  | 'to bottom'
  | 'to top right'
  | 'to top left'
  | 'to bottom right'
  | 'to bottom left'
  | '0deg' // from bottom to top
  | '90deg' // from left to right
  | '180deg' // from top to bottom
  | '270deg' // from right to left

export type T_SvgProps = {
  className?: string,
  color?: string,
  strokeWidth?: keyof typeof STROKE_WIDTH,
  onClick?: () => any
}