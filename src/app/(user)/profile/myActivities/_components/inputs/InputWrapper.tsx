import { InputWrapperProps } from "../../types/input";

const InputWrapper = ({ label, error, required, children }: InputWrapperProps) => {
  return (
    <div className="flex w-full flex-col gap-2.5">
      {label && (
        <label className="typo-16-b">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex flex-col gap-1.5">
        {children}
        {error && <p className="typo-14-m text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputWrapper;
