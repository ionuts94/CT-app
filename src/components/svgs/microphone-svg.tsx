import { T_SvgProps } from "../../types/others"

export const MicrophoneSvg: React.FC<T_SvgProps> = ({ className, color, strokeWidth = 'bold' }) => {
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
        d="M6 3C6 1.89543 6.89543 1 8 1V1V1C9.10457 1 10 1.89543 10 3V7C10 8.10457 9.10457 9 8 9V9V9C6.89543 9 6 8.10457 6 7V3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M3 8C3 9.06087 3.52678 10.0783 4.46447 10.8284C5.40215 11.5786 6.67392 12 8 12C9.32608 12 10.5979 11.5786 11.5355 10.8284C12.4732 10.0783 13 9.06087 13 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M6 15L10 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M8 12V15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  )
}