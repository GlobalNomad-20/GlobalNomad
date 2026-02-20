"use client";

import InputWrapper from "../InputWrapper";

import { SelectDropdownUI } from "./SelectDropdownUI";

import { usePopup } from "@/hooks/usePopup";

export interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options?: readonly (string | undefined)[];
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const SelectInput = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  required,
  className,
}: SelectInputProps) => {
  const { triggerRef, popupRef, open, handleToggle, handleClose } = usePopup<HTMLUListElement>();

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    handleClose();
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <SelectDropdownUI
        value={value}
        onSelectOption={handleSelect}
        placeholder={placeholder}
        className={className}
        options={options}
        error={error}
        open={open}
        triggerRef={triggerRef}
        popupRef={popupRef}
        onToggle={handleToggle}
      />
    </InputWrapper>
  );
};

export default SelectInput;
