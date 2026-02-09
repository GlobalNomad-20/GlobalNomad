import { SVGAttributes } from "react";

interface AltArrowRightSvgProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const AltArrowRightSvg = ({ size = 24, ...props }: AltArrowRightSvgProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.9723 12.7231C15.3728 12.3617 15.3728 11.6394 14.9723 11.278L9.92996 6.72851C9.43454 6.28152 8.72725 6.70645 8.72725 7.45109V16.55C8.72725 17.2946 9.43454 17.7195 9.92996 17.2726L14.9723 12.7231Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AltArrowRightSvg;
