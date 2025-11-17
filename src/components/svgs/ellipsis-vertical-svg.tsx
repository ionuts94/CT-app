import { T_SvgProps } from "../../types/others"

export const EllipsisVerticalSvg: React.FC<T_SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_3007)">
        <circle cx="8" cy="3" r="1.5" fill="currentColor" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="13" r="1.5" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_2936_3007">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}