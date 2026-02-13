"use client";

import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";

import InputWrapper from "./InputWrapper";

import { cn } from "@/utils/cn";

export const ScheduleInput = ({ name, label, placeholder, required, className }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const error = errors[name]?.message as string | undefined;

  return (
    <InputWrapper label={label} error={error} required={required}>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          "typo-16-m w-full rounded-2xl border border-gray-100 px-5 py-4.5 transition-colors",
          "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)] placeholder:text-gray-400",
          "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
      />
    </InputWrapper>
  );
};

export default ScheduleInput;
