import { T_SvgProps } from "../../types/others"

export const FileSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold', color }) => {
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
        d="M9.57143 12.9999H2.42857C2.04969 12.9999 1.68633 12.8594 1.41842 12.6094C1.15051 12.3593 1 12.0202 1 11.6666V2.33324C1 1.97962 1.15051 1.64048 1.41842 1.39043C1.68633 1.14038 2.04969 0.999904 2.42857 0.999904L8 0.999878L11 3.99988V11.6666C11 12.0202 10.8495 12.3593 10.5816 12.6094C10.3137 12.8594 9.95031 12.9999 9.57143 12.9999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const FileTextSvg: React.FC<T_SvgProps> = ({ className, strokeWidth = 'bold', color }) => {
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
        d="M11.5714 13.9998H4.42857C4.04969 13.9998 3.68633 13.8594 3.41842 13.6093C3.15051 13.3593 3 13.0201 3 12.6665V3.33318C3 2.97955 3.15051 2.64042 3.41842 2.39037C3.68633 2.14032 4.04969 1.99984 4.42857 1.99984L10 1.99982L13 4.99982V12.6665C13 13.0201 12.8495 13.3593 12.5816 13.6093C12.3137 13.8594 11.9503 13.9998 11.5714 13.9998Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 2V4.50005C10 4.63264 10.0527 4.75981 10.1464 4.85357C10.2402 4.94733 10.3674 5 10.5 5L13 4.99971"
        fill="currentColor" />
      <path
        d="M10 2L13 4.99971L10.5 5C10.3674 5 10.2402 4.94733 10.1464 4.85357C10.0527 4.75981 10 4.63264 10 4.50005V2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path d="M6 11H10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M6 8H10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  )
}