import React from "react";

const MinusSvg = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.833333 0C0.373096 0 0 0.373096 0 0.833334C0 1.29357 0.373096 1.66667 0.833333 1.66667C7.83865 1.66667 4.98087 1.66667 12.5 1.66667C12.9602 1.66667 13.3333 1.29357 13.3333 0.833334C13.3333 0.373097 12.9602 5.96047e-07 12.5 5.96047e-07C4.98087 5.96047e-07 7.83864 0 0.833333 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MinusSvg;
