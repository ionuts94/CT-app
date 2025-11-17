
import { T_SvgProps } from "../../types/others"

export const BookSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold', color }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3426_2448)">
        <path
          d="M13 2V14H4.42857C4.04969 14 3.68633 13.842 3.41842 13.5607C3.15051 13.2794 3 12.8978 3 12.5V3.5C3 3.10218 3.15051 2.72064 3.41842 2.43934C3.68633 2.15804 4.04969 2 4.42857 2H13Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.9289 10.5H4.42859C4.04971 10.5 3.68634 10.7107 3.41842 11.0858C3.15051 11.4609 3 11.9696 3 12.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5H10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3426_2448">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const BookMarkSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold', color }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_3231)">
        <path
          d="M12 4.66667V14L8 11.3333L4 14V4.66667C4 3.95942 4.28095 3.28115 4.78105 2.78105C5.28115 2.28095 5.95942 2 6.66667 2H9.33333C10.0406 2 10.7189 2.28095 11.219 2.78105C11.719 3.28115 12 3.95942 12 4.66667Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2936_3231">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}