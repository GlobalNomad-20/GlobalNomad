"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import PasswordInput from "@/components/common/PasswordInput";
import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import Button from "@/components/common/Button";
import OKModal from "@/app/(auth)/login/_components/OKModal";
import { ROUTES } from "@/constants/routes";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/useAuthStore";

interface ILoginForm {
  email: string;
  password: string;
}

// 로그인 페이지
const Login = () => {
  const navigation = useRouter();
  const user = useAuthStore((s) => {
    return s.user;
  });
  const login = useAuthStore((s) => {
    return s.login;
  });
  const passwordFailModal = useModal();

  const { mutate: requestLogin, isPending } = useMutation({
    mutationFn: async (loginForm: ILoginForm) => {
      return await client.post(API_ENDPOINTS.AUTH.LOGIN, loginForm);
    },
    onSuccess: ({ data }) => {
      login(data.user);
    },
    onError: () => {
      handleOpenPasswordFailModal();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const handleOpenPasswordFailModal = () => {
    passwordFailModal.onOpen();
  };

  const handleClosePasswordFailModal = () => {
    passwordFailModal.onClose();
  };

  // 로그인 처리
  const onLoginAction: SubmitHandler<ILoginForm> = async (data) => {
    requestLogin(data);
  };

  const handleKakaoClick = () => {
    location.href = ROUTES.AUTH.KAKAO("signin");
  };

  useEffect(() => {
    if (user && navigation) navigation.replace(ROUTES.HOME);
  }, [user, navigation]);

  return (
    <div className="flex w-full flex-col items-center px-6">
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
        <form className="mt-10.5 w-full md:mt-15.5" onSubmit={handleSubmit(onLoginAction)}>
          {/* 이메일 */}
          <div className="typo-16-m mb-2.5 text-gray-950">이메일</div>
          <input
            {...register("email", {
              required: "이메일을 입력해 주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식으로 작성해주세요.",
              },
            })}
            placeholder="이메일을 입력해 주세요"
            type="email"
            className={`text-16-m w-full rounded-2xl border
              ${errors.email ? "border-red-500" : "border-gray-100"} py-[17.5px] pl-5 outline-0`}
          />

          {errors.email && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.email.message}</div>
          )}

          {/* 패스워드 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호</div>
          <PasswordInput
            {...register("password", {
              required: "비밀번호를 입력해 주세요",
              minLength: {
                value: 8,
                message: "8자 이상 입력해 주세요.",
              },
            })}
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            className={`w-full ${errors.password ? "border-red-500" : ""}`}
          />

          {errors.password && (
            <div className="typo-12-m mt-1.5 text-red-500">{errors.password.message}</div>
          )}

          <Button
            variant={isValid && !isPending ? "primary" : "disabled"}
            className="mt-7.5 h-13.5 w-full text-white"
          >
            <div>로그인하기</div>
          </Button>
        </form>

        <div className="my-5 flex w-full items-center md:my-7.5">
          <div className="h-px flex-1 bg-gray-100" />
          <div className="font-16-m mx-3.5 text-[#79747E]">or</div>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <Button
          variant="outline"
          icon={<Image width={24} height={24} src="/image/kakao.png" alt="kakao" />}
          className="h-13.5 w-full"
          type="button"
          onClick={handleKakaoClick}
        >
          카카오 로그인
        </Button>

        <div className="typo-16-m mt-6 text-gray-400 md:mt-7.5">
          회원이 아니신가요?{" "}
          <Link href="/register" className="underline">
            회원가입하기
          </Link>
        </div>
      </div>

      {passwordFailModal.isOpen && (
        <OKModal
          isOpen={!!passwordFailModal.isOpen}
          onClose={handleClosePasswordFailModal}
          message="비밀번호가 일치하지 않습니다."
        />
      )}
    </div>
  );
};

export default Login;
