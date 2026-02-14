"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";
import useProfileImageUploader from "../../../(with-nav)/_hooks/useProfileImageUploader";

import InputWrapper from "./InputWrapper";

import { cn } from "@/utils/cn";
import ImageAddSvg from "@/assets/svg/ImageAddSvg";
import ImageFullSvg from "@/assets/svg/ImageFullSvg";
import DeleteSvg from "@/assets/svg/DeleteSvg";

type ArrayFieldKeys = {
  [K in keyof MyActivityFormValues]: MyActivityFormValues[K] extends string[] ? K : never;
}[keyof MyActivityFormValues];

interface ImageInputProps extends Omit<InputProps, "name"> {
  name: ArrayFieldKeys;
  maxCount?: number;
}

const ImageInput = ({ name, label, required, className, maxCount = 4 }: ImageInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const { fileInputRef, handleEditClick, resetInput } = useProfileImageUploader();

  const images = (watch(name) as string[]) || [];
  const error = (errors[name as keyof MyActivityFormValues]?.message as string) || undefined;

  const isFull = images.length >= maxCount;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // TODO: API 연결 후 변경 필요
      const uploadedUrl = URL.createObjectURL(file);
      const newImages = [...images, uploadedUrl];
      setValue(name, newImages as MyActivityFormValues[ArrayFieldKeys], {
        shouldValidate: true,
      });
    } catch (err) {
      console.error("업로드 실패:", err);
    } finally {
      resetInput();
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => {
      return i !== index;
    });
    setValue(name, newImages as MyActivityFormValues[ArrayFieldKeys], {
      shouldValidate: true,
    });
  };

  const handleImageAddClick = () => {
    if (!isFull) {
      handleEditClick();
    }
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <div className={cn("flex gap-3.5 overflow-x-auto pt-2.5 md:overflow-visible", className)}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isFull}
        />

        <div
          onClick={handleImageAddClick}
          className={cn(
            "relative flex shrink-0 flex-col items-center justify-center transition-all",
            "h-20 w-20 rounded-lg border border-gray-100 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
            "md:h-31.5 md:w-31.5 md:rounded-2xl lg:h-32 lg:w-32",
            isFull ? "cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white hover:bg-gray-50",
            error && "border-red-500",
          )}
        >
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <div className="relative">
              {isFull ? (
                <ImageFullSvg className="h-8 w-8 text-gray-400 md:h-10 md:w-10" />
              ) : (
                <ImageAddSvg className="h-6 w-6 md:h-8 md:w-8" />
              )}
            </div>
            <span className={cn("typo-13-m md:typo-14-m", isFull ? "text-gray-400" : "text-black")}>
              {images.length}/{maxCount}
            </span>
          </div>
        </div>

        {images.map((url, index) => {
          return (
            <div
              key={`${url}-${index}`}
              className={cn("relative h-20 w-20 shrink-0", "md:h-31.5 md:w-31.5 lg:h-32 lg:w-32")}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg md:rounded-2xl">
                <Image src={url} alt={`preview-${index}`} fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage.bind(null, index)}
                className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center
                  rounded-full bg-gray-950 text-white shadow-md transition-transform hover:scale-110
                  md:h-6.5 md:w-6.5"
              >
                <DeleteSvg className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </InputWrapper>
  );
};
export default ImageInput;
