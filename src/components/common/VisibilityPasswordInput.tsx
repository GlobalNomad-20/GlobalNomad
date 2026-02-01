"use client";

import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import ActiveOffSvg from "@/assets/svg/ActiveOffSvg";
import ActiveOnSvg from "@/assets/svg/ActiveOnSvg";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
}

const VisibilityPasswordInput = ({
  label,
  registration,
  error,
  placeholder,
  disabled,
  autoComplete = "new-password",
  className,
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const inputId = registration.name;

  const handleVisible = () => {
    setVisible((v) => {
      return !v;
    });
  };

  return (
    <div className={`${className ?? ""}`}>
      <label htmlFor={inputId} className="typo-16-m mb-2.5 inline-block">
        {label}
      </label>
      <div
        className={clsx(
          `relative flex items-center gap-2 rounded-xl border py-3.5 pr-3.75 pl-5
          shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]`,
          error
            ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500"
            : `border-gray-100 focus-within:border-blue-500 focus-within:ring-1
              focus-within:ring-blue-500`,
        )}
      >
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={clsx("typo-16-m w-full focus:outline-none")}
          {...registration}
        />
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onClick={handleVisible}
          aria-label={visible ? `${label} 숨기기` : `${label} 보기`}
          disabled={disabled}
        >
          {visible ? <ActiveOnSvg /> : <ActiveOffSvg />}
        </button>
      </div>
      {error && <p className="typo-12-m mt-1.5 pl-2 text-red-500">{error}</p>}
    </div>
  );
};

export default VisibilityPasswordInput;
