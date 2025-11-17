import { T_SvgProps } from "../../types/others"

export const PenSvg: React.FC<T_SvgProps> = ({ className, color, onClick = () => null }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_4982)">
        <path
          d="M2.66699 13.3335H5.33366L12.3337 6.33345C12.5088 6.15836 12.6476 5.95049 12.7424 5.72171C12.8372 5.49294 12.8859 5.24774 12.8859 5.00012C12.8859 4.7525 12.8372 4.5073 12.7424 4.27853C12.6476 4.04975 12.5088 3.84188 12.3337 3.66679C12.1586 3.49169 11.9507 3.3528 11.7219 3.25804C11.4931 3.16328 11.2479 3.1145 11.0003 3.1145C10.7527 3.1145 10.5075 3.16328 10.2787 3.25804C10.05 3.3528 9.84209 3.49169 9.66699 3.66679L2.66699 10.6668V13.3335Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
        <path
          d="M9 4.33325L11.6667 6.99992"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2936_4982">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  )
}