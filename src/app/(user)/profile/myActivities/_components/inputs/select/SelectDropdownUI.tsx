"use client";

import { cn } from "@/utils/cn";
import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

export interface SelectDropdownUIProps {
  value: string;
  onSelectOption: (value: string) => void;
  placeholder?: string;
  className?: string;
  options?: readonly (string | undefined)[];
  error?: string;
  open: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popupRef: React.RefObject<HTMLUListElement | null>;
  onToggle: () => void;
}

export const SelectDropdownUI = ({
  value,
  onSelectOption,
  placeholder,
  className,
  options,
  error,
  open,
  triggerRef,
  popupRef,
  onToggle: handleToggle,
}: SelectDropdownUIProps) => {
  const handleSelect = (selectedValue: string) => {
    return () => {
      onSelectOption(selectedValue);
    };
  };

  return (
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
          !value && "text-gray-400",
          error && "border-red-500 ring-red-500",
          className,
        )}
      >
        <span>{value || placeholder}</span>
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
                    value === option ? "bg-gray-25 text-gray-900" : "text-gray-600",
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
  );
};
