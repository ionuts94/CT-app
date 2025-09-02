import { STROKE_WIDTH } from "@/constants/svgs"
import { T_SvgProps } from "@/types/others"

export const MessageIconSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold' }) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 11H3C2.46957 11 1.96086 10.7892 1.58579 10.4142C1.21071 10.0391 1 9.53039 1 8.99996V3.66663C1 3.13619 1.21071 2.62749 1.58579 2.25241C1.96086 1.87734 2.46957 1.66663 3 1.66663H11C11.5304 1.66663 12.0391 1.87734 12.4142 2.25241C12.7893 2.62749 13 3.13619 13 3.66663V8.99996C13 9.53039 12.7893 10.0391 12.4142 10.4142C12.0391 10.7892 11.5304 11 11 11H9L7 13L5 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}