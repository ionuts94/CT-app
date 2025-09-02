import { T_SvgProps } from "@/types/others"

export const BackArrowSvg: React.FC<T_SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_2890)">
        <path
          d="M5.99992 9.33333L3.33325 6.66667L5.99992 4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
        <path
          d="M3.33325 6.66663H10.6666C11.3738 6.66663 12.0521 6.94758 12.5522 7.44767C13.0523 7.94777 13.3333 8.62605 13.3333 9.33329C13.3333 10.0405 13.0523 10.7188 12.5522 11.2189C12.0521 11.719 11.3738 12 10.6666 12H9.99992"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2936_2890">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const ArrowRightSvg: React.FC<T_SvgProps> = ({ className }) => {
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
        d="M14 8L2.5 8M14 8L9.15 13M14 8L9.15 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}