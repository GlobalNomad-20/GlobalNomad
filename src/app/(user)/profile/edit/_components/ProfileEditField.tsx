"use client";

import Link from "next/link";
import { SubmitHandler } from "react-hook-form";

import useProfileEditForm, { ProfileFormValues } from "../_hooks/useProfileEditForm";

import Button from "@/components/common/Button";
import TextField from "@/components/common/TextField";
import VisibilityPasswordInput from "@/components/common/VisibilityPasswordInput";
import { ROUTES } from "@/constants/routes";
import { useMyInfo, useUpdateMyInfo } from "@/hooks/queries/useUser";
import useLogin from "@/hooks/useLogin";
import { User } from "@/types/user";

interface ProfileEditFieldProps {
  initialData: User | null;
}

const ProfileEditField = ({ initialData }: ProfileEditFieldProps) => {
  useLogin();
  const { data: userData } = useMyInfo(initialData);
  const { mutate: updateUserInfo } = useUpdateMyInfo();

  const { register, handleSubmit, errors, validationRules } = useProfileEditForm(userData);

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    const requestBody = {
      nickname: data.nickname,
      ...(data.password ? { newPassword: data.password } : {}),
    };
    updateUserInfo(requestBody, {
      onSuccess: () => {
        alert("내 정보가 수정되었습니다.");
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : "수정에 실패했습니다.";
        alert(message);
      },
    });
  };

  return (
    <section>
      <div className="mb-5 py-2.5">
        <h3 className="typo-18-b mb-2.5">내 정보</h3>
        <p className="typo-14-m text-gray-500">닉네임, 이메일, 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <form className="flex flex-col gap-4.5 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="닉네임"
          type="text"
          defaultValue={initialData?.nickname}
          placeholder="닉네임을 입력하세요"
          error={errors.nickname?.message}
          registration={register("nickname", validationRules.nickname)}
          autoComplete="username"
        />
        <TextField
          label="이메일"
          type="email"
          disabled
          defaultValue={initialData?.email}
          placeholder="example@email.com"
          registration={register("email", validationRules.email)}
          autoComplete="email"
        />
        <VisibilityPasswordInput
          label="비밀번호"
          placeholder="변경할 비밀번호 (8자 이상)"
          error={errors.password?.message}
          registration={register("password", validationRules.password)}
          autoComplete="new-password"
        />
        <VisibilityPasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          error={errors.passwordConfirm?.message}
          registration={register("passwordConfirm", validationRules.passwordConfirm)}
          autoComplete="new-password"
        />
        <div className="typo-16-m flex gap-3 md:justify-center">
          <Link
            href={ROUTES.PROFILE.ROOT}
            className="hover:bg-gray-25 w-full rounded-xl border border-gray-200 bg-white py-3.5
              text-center text-gray-600 transition-colors hover:cursor-pointer md:hidden
              md:rounded-[14px] lg:rounded-2xl"
          >
            취소하기
          </Link>
          <Button type="submit" className="w-full py-3.5 md:w-30">
            저장하기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProfileEditField;
