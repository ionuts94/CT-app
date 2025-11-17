import { T_SvgProps } from "../../types/others"

export const BellSvg: React.FC<T_SvgProps> = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.9609 15.9524V7.88107C17.9609 4.08075 14.8287 1 10.9649 1C7.10116 1 3.96896 4.08075 3.96896 7.88107V15.9524M17.9609 15.9524H3.96896M17.9609 15.9524H21M3.96896 15.9524H1M13 19H9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}