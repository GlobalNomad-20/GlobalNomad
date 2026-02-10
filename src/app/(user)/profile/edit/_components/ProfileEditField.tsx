"use client";

import Link from "next/link";

import useProfileEditForm from "../_hooks/useProfileEditForm";

import Button from "@/components/common/Button";
import TextField from "@/components/common/TextField";
import VisibilityPasswordInput from "@/components/common/VisibilityPasswordInput";
import { ROUTES } from "@/constants/routes";
import useAuthStore from "@/store/useAuthStore";

const ProfileEditField = () => {
  const user = useAuthStore((s) => {
    return s.user;
  });
  const { register, handleSubmit, errors, validationRules } = useProfileEditForm(user);

  return (
    <section>
      <div className="mb-5 py-2.5">
        <h3 className="typo-18-b mb-2.5">내 정보</h3>
        <p className="typo-14-m text-gray-500">닉네임과 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <form
        className="flex flex-col gap-4.5 md:gap-6"
        onSubmit={handleSubmit((data) => {
          return console.log(data);
        })}
      >
        <TextField
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          error={errors.nickname?.message}
          registration={register("nickname", validationRules.nickname)}
        />
        <TextField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          registration={register("email", validationRules.email)}
        />
        <VisibilityPasswordInput
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요"
          error={errors.password?.message}
          registration={register("password", validationRules.password)}
        />
        <VisibilityPasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          error={errors.passwordConfirm?.message}
          registration={register("passwordConfirm", validationRules.passwordConfirm)}
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
