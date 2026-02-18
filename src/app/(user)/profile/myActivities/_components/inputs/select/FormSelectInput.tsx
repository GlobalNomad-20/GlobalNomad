"use client";

import { useFormContext, Path, PathValue, get } from "react-hook-form";

import { MyActivityFormValues } from "../../../_schema/myActivityFormSchema";

import { SelectInput, SelectInputProps } from "./SelectInput";

interface FormSelectInputProps extends Omit<SelectInputProps, "value" | "onChange" | "error"> {
  name: Path<MyActivityFormValues>;
}

export const FormSelectInput = ({ name, ...props }: FormSelectInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const currentValue = watch(name) as string;
  const error = get(errors, name)?.message as string | undefined;

  const handleSelect = (value: string) => {
    setValue(name, value as PathValue<MyActivityFormValues, Path<MyActivityFormValues>>, {
      shouldValidate: true,
    });
  };

  return <SelectInput {...props} value={currentValue} onChange={handleSelect} error={error} />;
};
