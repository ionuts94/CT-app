import { STROKE_WIDTH } from "@/constants/svgs"
import { T_SvgProps } from "@/types/others"

export const ClockSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold' }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8 8L10.5 5.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}