import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "disabled" | "outline";
  icon?: ReactNode;
}

const Button = ({ children, variant = "primary", icon, className = "", ...props }: ButtonProps) => {
  const baseStyles =
    "py-3 md:py-[14.5px] lg:py-[17.5px] rounded-[12px] md:rounded-[14px] lg:rounded-[16px] transition-colors flex items-center justify-center gap-1";

  const variantStyles = {
    primary: "bg-primary-500 hover:bg-[#3d95e2] text-white typo-14-b md:typo-16-b cursor-pointer",
    disabled: "bg-gray-200 text-white typo-14-b md:typo-16-b cursor-not-allowed",
    outline:
      "border-1 border-gray-200 text-gray-600 hover:bg-gray-25 typo-14-m md:typo-16-m cursor-pointer",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
