"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import PasswordInput from "@/components/common/PasswordInput";
import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/common/Button";
import OKModal from "@/app/(auth)/login/_components/OKModal";
import { ROUTES } from "@/constants/routes";
import { useModal } from "@/hooks/useModal";

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}
// 회원가입 폼 데이터 정의
interface ISignUpForm extends SignUpRequest {
  passwordConfirm: string;
}

// 회원가입 페이지
const Register = () => {
  const navigation = useRouter();
  const user = useAuthStore((s) => {
    return s.user;
  });
  const registerCompleteModal = useModal();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState("알 수 없는 에러");

  const { mutate: requestRegister, isPending } = useMutation({
    mutationFn: async (formData: SignUpRequest) => {
      return await client.post(API_ENDPOINTS.USERS.SIGNUP, formData);
    },
    onSuccess: () => {
      handleOpenRegisterCompleteModal();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        const code = e.response?.status;
        if (code == 409) setErrorMessage("이미 사용 중인 이메일입니다.");
        else setErrorMessage(e.message);
      }
      handleOpenErrorModal();
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: "onBlur",
  });

  const handleOpenRegisterCompleteModal = () => {
    registerCompleteModal.onOpen();
  };

  const handleOpenErrorModal = () => {
    errorModal.onOpen();
  };

  const handleCloseErrorModal = () => {
    errorModal.onClose();
  };

  // 패스워드(패스워드 확인용)
  const password = useWatch({
    control,
    name: "password",
  });

  // 가입 완료 모달 확인 버튼 클릭 시
  const handleRegisterOK = () => {
    registerCompleteModal.onClose();
    navigation.replace(ROUTES.AUTH.LOGIN);
  };

  // 회원가입 처리
  const onRegisterSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    requestRegister({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    });
  };

  const handleKakaoClick = () => {
    location.href = ROUTES.AUTH.KAKAO("signup");
  };

  useEffect(() => {
    if (user && navigation) navigation.replace(ROUTES.HOME);
  }, [user, navigation]);

  return (
    <div className="mb-25 flex w-full flex-col items-center px-6">
      <div className="mt-16.25 flex w-full flex-col items-center md:mt-34.75 md:w-160">
        <Link className="flex flex-col items-center" href={ROUTES.HOME}>
          <Image width={144} height={144} src="/image/earth.png" alt="logo" />
          <Image
            width={255}
            height={31}
            src="/image/logo.png"
            alt="logo text"
            className="mt-6 hidden md:block"
          />
        </Link>
        <form className="mt-10.5 w-full md:mt-15.5" onSubmit={handleSubmit(onRegisterSubmit)}>
          {/* 이메일 */}
          <div className="typo-16-m mb-2.5 text-gray-950">이메일</div>
          <input
            placeholder="이메일을 입력해 주세요"
            type="email"
            className={`text-16-m w-full rounded-2xl border
              ${errors.email ? "border-red-500" : "border-gray-100"} py-[17.5px] pl-5 outline-0`}
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "잘못된 이메일 입니다.",
              },
            })}
          />

          {errors.email && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.email.message}</div>
          )}

          {/* 닉네임 */}
          <div className="typo-16-m mt-5 mb-2.5 text-gray-950">닉네임</div>
          <input
            placeholder="닉네임을 입력해 주세요"
            type="text"
            className={`text-16-m w-full rounded-2xl border
              ${errors.nickname ? "border-red-500" : "border-gray-100"} py-[17.5px] pl-5 outline-0`}
            {...register("nickname", {
              required: "닉네임을 입력해 주세요.",
              maxLength: {
                value: 10,
                message: "열 자 이하로 작성해주세요.",
              },
            })}
          />

          {errors.nickname && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.nickname.message}</div>
          )}

          {/* 비밀번호 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호</div>
          <input
            placeholder="8자 이상 입력해 주세요"
            type="password"
            className={`text-16-m w-full rounded-2xl border py-[17.5px] pl-5 outline-0
              ${errors.password ? "border-red-500" : "border-gray-100"}`}
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 8,
                message: "8자 이상 입력해 주세요.",
              },
            })}
          />

          {errors.password && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.password.message}</div>
          )}

          {/* 비밀번호 확인 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호 확인</div>
          <PasswordInput
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            className={`w-full ${errors.passwordConfirm ? "border-red-500" : ""}`}
            {...register("passwordConfirm", {
              required: "비밀번호가 일치하지 않습니다.",
              validate: (value) => {
                return value === password || "비밀번호가 일치하지 않습니다.";
              },
            })}
          />

          {errors.passwordConfirm && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.passwordConfirm.message}</div>
          )}

          <Button
            variant={isValid && !isPending ? "primary" : "disabled"}
            className="mt-7.5 h-13.5 w-full text-white"
            type="submit"
          >
            <div>회원가입하기</div>
          </Button>
        </form>

        <div className="my-5 flex w-full items-center md:my-7.5">
          <div className="h-px flex-1 bg-gray-100" />
          <div className="font-16-m mx-3.5 text-[#79747E]">SNS 계정으로 회원가입하기</div>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <Button
          variant="outline"
          icon={<Image width={24} height={24} src="/image/kakao.png" alt="kakao" />}
          className="h-13.5 w-full"
          type="button"
          onClick={handleKakaoClick}
        >
          카카오 회원가입
        </Button>

        <div className="typo-16-m mt-6 text-gray-400 md:mt-7.5">
          회원신가요?{" "}
          <Link href="/login" className="underline">
            로그인하기
          </Link>
        </div>
      </div>

      {registerCompleteModal.isOpen && (
        <OKModal
          isOpen={!!registerCompleteModal.isOpen}
          onClose={handleRegisterOK}
          onBackgroundClose={handleRegisterOK}
          message="가입이 완료되었습니다."
        />
      )}

      {errorModal.isOpen && (
        <OKModal
          isOpen={!!errorModal.isOpen}
          onClose={handleCloseErrorModal}
          message={errorMessage}
        />
      )}
    </div>
  );
};

export default Register;
