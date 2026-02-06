import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "disabled" | "outline";
  icon?: ReactNode;
}

const Button = ({ children, variant = "primary", icon, className = "", ...props }: ButtonProps) => {
  const baseStyles =
    "w-30 py-4 rounded-xl transition-colors flex items-center justify-center gap-1";

  const variantStyles = {
    primary: "bg-primary-500 hover:bg-[#3d95e2] text-white typo-14-b cursor-pointer",
    disabled: "bg-gray-200 text-white typo-14-b cursor-not-allowed",
    outline: "border-1 border-gray-200 text-gray-600 hover:bg-gray-25 typo-14-m cursor-pointer",
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
