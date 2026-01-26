import { InputHTMLAttributes, useState } from "react";

import EyeOff from "@/app/components/image/eyeoff";
import EyeOn from "@/app/components/image/eyeon";

type PasswordInputProps = {
  className: string;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ className = "", ...rest }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <div
      className={`text-16-m flex items-center rounded-2xl border border-gray-100 py-[17.5px] pr-2.5
        pl-5 ${className}`}
    >
      <input {...rest} className="flex-1 outline-0" type={show ? "text" : "password"} />
      <button type="button" className="ml-2 cursor-pointer" onClick={handleShowClick}>
        {show ? <EyeOn /> : <EyeOff />}
      </button>
    </div>
  );
};

export default PasswordInput;
