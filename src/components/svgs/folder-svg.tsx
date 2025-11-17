import { T_SvgProps } from "../../types/others"

export const FolderSvg: React.FC<T_SvgProps> = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2936_2877)">
        <path
          d="M5.19995 4H9.19995L12.2 7H19.2C19.7304 7 20.2391 7.21071 20.6142 7.58579C20.9892 7.96086 21.2 8.46957 21.2 9V17C21.2 17.5304 20.9892 18.0391 20.6142 18.4142C20.2391 18.7893 19.7304 19 19.2 19H5.19995C4.66952 19 4.16081 18.7893 3.78574 18.4142C3.41066 18.0391 3.19995 17.5304 3.19995 17V6C3.19995 5.46957 3.41066 4.96086 3.78574 4.58579C4.16081 4.21071 4.66952 4 5.19995 4Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2936_2877">
          <rect width="24" height="24" fill="white" transform="translate(0.199951)" />
        </clipPath>
      </defs>
    </svg>

  )
}