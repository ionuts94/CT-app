import { T_SvgProps } from "../../types/others"

export const QuestionMarkSvg: React.FC<T_SvgProps> = ({ className, color = "hsla(var(--primary-blue))", ...rest }) => {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        x="1"
        y="1"
        width="24"
        height="24"
        rx="12"
        stroke={color}
        strokeOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6476 18.2597V18.2702"
        stroke={color}
        strokeOpacity="1"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6475 14.5847C12.6282 14.2438 12.7202 13.9059 12.9095 13.6219C13.0989 13.3378 13.3755 13.123 13.6975 13.0097C14.0922 12.8588 14.4465 12.6183 14.7324 12.3072C15.0183 11.9961 15.2282 11.6229 15.3453 11.2169C15.4625 10.811 15.4839 10.3833 15.4077 9.96772C15.3315 9.5521 15.16 9.15983 14.9064 8.8218C14.6529 8.48377 14.3244 8.2092 13.9467 8.01971C13.569 7.83022 13.1525 7.73098 12.73 7.72981C12.3075 7.72864 11.8904 7.82556 11.5117 8.01295C11.133 8.20034 10.8029 8.47309 10.5475 8.80971"
        stroke={color}
        strokeOpacity="1"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
