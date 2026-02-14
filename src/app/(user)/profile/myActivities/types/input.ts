import { MyActivityFormValues } from "../_schema/myActivityFormSchema";

export interface InputWrapperProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  id?: string;
}

export interface InputProps {
  name: keyof MyActivityFormValues;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  options?: readonly (string | undefined)[];
}
