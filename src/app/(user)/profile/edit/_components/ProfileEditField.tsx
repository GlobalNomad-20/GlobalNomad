"use client";

import Link from "next/link";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import Button from "@/components/common/Button";
import TextField from "@/components/common/TextField";
import VisibilityPasswordInput from "@/components/common/VisibilityPasswordInput";
import { ROUTES } from "@/constants/routes";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const ProfileEditField = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });
  const password = useWatch({ control, name: "password" }) ?? "";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("제출 성공:", data);
  };

  return (
    <section>
      <div className="mb-5 py-2.5">
        <h3 className="typo-18-b mb-2.5">내 정보</h3>
        <p className="typo-14-m text-gray-500">닉네임과 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <form className="flex flex-col gap-4.5 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          error={errors.nickname?.message}
          registration={register("nickname", {
            required: "닉네임을 입력해주세요.",
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이하로 작성해야 합니다.",
            },
          })}
        />
        <TextField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          registration={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: emailPattern,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />
        <VisibilityPasswordInput
          label="비밀번호"
          placeholder="8자 이상 입렫해 주세요"
          error={errors.password?.message}
          registration={register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다.",
            },
          })}
        />
        <VisibilityPasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          error={errors.passwordConfirm?.message}
          registration={register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => {
              return value === password || "비밀번호가 일치하지 않습니다.";
            },
          })}
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
