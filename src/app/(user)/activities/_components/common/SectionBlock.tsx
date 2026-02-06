import { ReactNode } from "react";

interface SectionBlockProps {
  children: ReactNode;
}
const SectionBlock = ({ children }: SectionBlockProps) => {
  return (
    <div
      className="w-81.75 border-b border-gray-100 py-5 md:w-171 md:pt-7.5 md:pb-10 lg:w-167.5
        lg:py-10"
    >
      {children}
    </div>
  );
};

export default SectionBlock;
