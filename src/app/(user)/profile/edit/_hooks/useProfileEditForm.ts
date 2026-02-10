import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import useLogin from "@/hooks/useLogin";

// 폼 데이터 타입 정의
export type ProfileFormValues = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

// 훅이 받을 수 있는 초기 데이터 타입 (User 타입에 맞춰 수정 가능)
type InitialData = {
  nickname?: string;
  email?: string;
} | null;

const useProfileEditForm = (initialData: InitialData) => {
  useLogin();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      reset({
        nickname: initialData.nickname || "",
        email: initialData.email || "",
        password: "", // 비밀번호는 보안상 비워둠
        passwordConfirm: "",
      });
    }
  }, [initialData, reset]);

  const password = useWatch({ control, name: "password" }) ?? "";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationRules = {
    nickname: {
      required: "닉네임을 입력해주세요.",
      maxLength: {
        value: 10,
        message: "닉네임은 10자 이하로 작성해야 합니다.",
      },
    },
    email: {
      required: "이메일을 입력해주세요.",
      pattern: {
        value: emailPattern,
        message: "올바른 이메일 형식이 아닙니다.",
      },
    },
    password: {
      // 수정 시 비밀번호는 필수가 아닐 수도 있지만, 로직에 따라 required 조정
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 8,
        message: "비밀번호는 8자 이상이어야 합니다.",
      },
    },
    passwordConfirm: {
      required: "비밀번호 확인을 입력해주세요.",
      validate: (value: string) => {
        return value === password || "비밀번호가 일치하지 않습니다.";
      },
    },
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log("제출 성공:", data);
  };

  return { register, handleSubmit, errors, validationRules, onSubmit };
};

export default useProfileEditForm;
