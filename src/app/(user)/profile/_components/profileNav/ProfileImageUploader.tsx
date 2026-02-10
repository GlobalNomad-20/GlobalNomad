"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

import useProfileImageUploader from "../../_hooks/useProfileImageUploader"; // 분리한 훅

import EditSvg from "@/assets/svg/EditSvg";
import { useMyInfo, useUpdateMyInfo, useUploadProfileImage } from "@/hooks/queries/useUser";
import { cn } from "@/utils/cn";

const ProfileImageUploader = () => {
  const { data: user } = useMyInfo();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadProfileImage();
  const { mutate: updateProfile } = useUpdateMyInfo();

  const { fileInputRef, handleEditClick, resetInput } = useProfileImageUploader();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { profileImageUrl } = await uploadImage(file);
      updateProfile(
        { profileImageUrl },
        {
          onSuccess: () => {
            alert("프로필 이미지가 변경되었습니다.");
          },
          onError: () => {
            alert("프로필 이미지 변경에 실패했습니다.");
          },
        },
      );
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      resetInput();
    }
  };

  const profileSrc = user?.profileImageUrl || "/image/profile.png";

  return (
    <div className="mb-6 flex items-center justify-center md:mb-3 lg:mb-6">
      <div className="relative size-30 md:size-17.5 lg:size-30">
        <div className="relative size-full overflow-hidden rounded-full border border-gray-200">
          <Image
            src={profileSrc}
            fill
            className={cn("object-cover", isUploading && "opacity-50")}
            alt="사용자 프로필"
          />
        </div>
        <button
          type="button"
          onClick={handleEditClick}
          className="absolute right-0.5 bottom-1 flex size-7.5 cursor-pointer items-center
            justify-center rounded-full bg-gray-300 text-white transition-colors hover:bg-gray-400
            md:right-0 md:bottom-0 md:size-6 lg:size-7.5"
          disabled={isUploading}
        >
          <EditSvg className="size-4 md:size-[12.8px] lg:size-4" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
