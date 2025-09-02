import { T_SvgProps } from "@/types/others"

export const RightChevronSvg: React.FC<T_SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.7998 3.7998L11 8L6.7998 12.2002"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const LeftChevronSvg: React.FC<T_SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.2002 3.7998L5 8L9.2002 12.2002"
        stroke="#263BAB"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

  )
}

export const DownChevronSvg: React.FC<T_SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_4755)">
        <path
          d="M4 6L8 10L12 6"
          stroke={color}
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2936_4755">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}