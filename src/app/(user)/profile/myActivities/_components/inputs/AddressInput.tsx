"use client";

import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";
import { useAddressSearch } from "../../_hooks/useAddressSearch";

import InputWrapper from "./InputWrapper";

import { cn } from "@/utils/cn";

export const AddressInput = ({ name, label, placeholder, required, className }: InputProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const { openAddressSearch } = useAddressSearch();
  const error = errors[name]?.message as string | undefined;
  const currentValue = watch(name);
  const hasAddress = Boolean(currentValue);

  const handleAddressSearchClick = () => {
    openAddressSearch((address) => {
      setValue(name, address, { shouldValidate: true, shouldDirty: true });
    });
  };

  const handleClearClick = () => {
    setValue(name, "", { shouldValidate: true, shouldDirty: true });
  };

  const handleInputClick = () => {
    if (!hasAddress) {
      handleAddressSearchClick();
    }
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <div className="relative">
        <input
          {...register(name)}
          placeholder={placeholder}
          readOnly
          onClick={handleInputClick}
          className={cn(
            "typo-16-m w-full rounded-2xl border border-gray-100 px-5 py-4.5 pr-24",
            "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)] transition-colors placeholder:text-gray-400",
            !hasAddress && "cursor-pointer hover:border-gray-300",
            "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
        />
        {hasAddress ? (
          <button
            type="button"
            onClick={handleClearClick}
            className={cn(
              "typo-14-m absolute top-1/2 right-3 -translate-y-1/2",
              "bg-gray-25 rounded-lg px-3 py-2 text-gray-400",
              "transition-colors hover:bg-gray-50",
            )}
          >
            지우기
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddressSearchClick}
            className={cn(
              "typo-14-m absolute top-1/2 right-3 -translate-y-1/2",
              "bg-primary-100 text-primary-500 rounded-lg px-3 py-2",
              "hover:bg-primary-200 transition-colors",
            )}
          >
            주소 찾기
          </button>
        )}
      </div>
    </InputWrapper>
  );
};

export default AddressInput;
