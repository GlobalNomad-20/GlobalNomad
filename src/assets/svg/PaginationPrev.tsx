import React from "react";

const PaginationPrev = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.707 0L0 5.707L5.707 11.414L7.121 10L2.828 5.707L7.121 1.414L5.707 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PaginationPrev;
