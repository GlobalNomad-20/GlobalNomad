"use client";

import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";

import InputWrapper from "./InputWrapper";

import { cn } from "@/utils/cn";
import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";
import { usePopup } from "@/hooks/usePopup";

export const SelectInput = ({
  name,
  label,
  placeholder,
  required,
  className,
  options,
}: InputProps) => {
  const { triggerRef, popupRef, open, handleToggle, handleClose } = usePopup<HTMLUListElement>();

  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const error = errors[name]?.message as string | undefined;
  const currentValue = watch(name) as string;

  const handleSelect = (value: string) => {
    return () => {
      setValue(name, value);
      handleClose();
      trigger(name);
    };
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <div className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className={cn(
            `typo-16-m flex w-full items-center justify-between rounded-2xl border bg-white px-5
            py-4.5 text-left transition-all`,
            "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
            open ? "border-gray-400 ring-1 ring-gray-400" : "border-gray-100",
            !currentValue && "text-gray-400",
            error && "border-red-500 ring-red-500",
            className,
          )}
        >
          <span>{currentValue || placeholder}</span>
          <div className={cn("text-black transition-transform duration-200", open && "rotate-180")}>
            <DropdownArrowSvg />
          </div>
        </button>

        {open && (
          <ul
            ref={popupRef}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border
              border-gray-100 bg-white py-2 shadow-lg"
          >
            {options?.map((option) => {
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={handleSelect(option as string)}
                    className={cn(
                      "typo-16-m w-full px-5 py-3 text-left transition-colors hover:bg-gray-50",
                      currentValue === option ? "bg-gray-25 text-gray-900" : "text-gray-600",
                    )}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </InputWrapper>
  );
};

export default SelectInput;
