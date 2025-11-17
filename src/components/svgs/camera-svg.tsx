import { T_SvgProps } from "../../types/others"

export const CameraSvg: React.FC<T_SvgProps> = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3542_2729)">
        <path
          d="M10 6.6306L13.0353 5.07221C13.1369 5.02006 13.2499 4.99544 13.3633 5.00069C13.4768 5.00594 13.5871 5.04089 13.6837 5.10221C13.7804 5.16353 13.8602 5.24919 13.9155 5.35107C13.9709 5.45295 13.9999 5.56767 14 5.68434V10.3157C13.9999 10.4323 13.9709 10.547 13.9155 10.6489C13.8602 10.7508 13.7804 10.8365 13.6837 10.8978C13.5871 10.9591 13.4768 10.9941 13.3633 10.9993C13.2499 11.0046 13.1369 10.9799 13.0353 10.9278L10 9.3694V6.6306Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
        <path
          d="M2 5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H8.66667C9.02029 4 9.35943 4.14048 9.60948 4.39052C9.85952 4.64057 10 4.97971 10 5.33333V10.6667C10 11.0203 9.85952 11.3594 9.60948 11.6095C9.35943 11.8595 9.02029 12 8.66667 12H3.33333C2.97971 12 2.64057 11.8595 2.39052 11.6095C2.14048 11.3594 2 11.0203 2 10.6667V5.33333Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_3542_2729">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}