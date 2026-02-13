import { useRef } from "react";

const useProfileImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return { fileInputRef, handleEditClick, resetInput };
};

export default useProfileImageUploader;
