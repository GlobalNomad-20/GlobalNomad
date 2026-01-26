"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PasswordInput from "../components/common/input/passwordInput";

import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import useAuthStore from "@/store/useAuthStore";

// 로그인 페이지
const Login = () => {
  const { login, setTokens, user } = useAuthStore();
  const navigation = useRouter();

  const onLoginAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    try {
      const res = await client.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      setTokens(res.data.accessToken, res.data.refreshToken);
      login(res.data.user);
    } catch (e) {
      console.log("error:", e);
    }
  };

  useEffect(() => {
    if (user && navigation) navigation.replace("/");
  }, [user, navigation]);

  return (
    <div className="flex w-full flex-col items-center px-6">
      <div className="mt-16.25 flex w-full flex-col items-center md:mt-34.75 md:w-160">
        <Image width={144} height={144} src="/image/earth.png" alt="logo" />
        <Image
          width={255}
          height={31}
          src="/image/logo.png"
          alt="logo text"
          className="mt-6 hidden md:block"
        />
        <form className="mt-10.5 w-full md:mt-15.5" action={onLoginAction}>
          {/* 이메일 */}
          <div className="typo-16-m mb-2.5 text-gray-950">이메일</div>
          <input
            placeholder="이메일을 입력해 주세요"
            type="email"
            name="email"
            className="text-16-m w-full rounded-2xl border border-gray-100 py-[17.5px] pl-5"
          />

          {/* 패스워드 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호</div>
          <PasswordInput
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            name="password"
            className="w-full"
          />

          <button
            className="bg-primary-500 mt-7.5 w-full cursor-pointer rounded-2xl py-[17.5px] font-bold
              text-white"
          >
            로그인하기
          </button>
        </form>

        <div className="my-5 flex w-full items-center md:my-7.5">
          <div className="h-px flex-1 bg-gray-100" />
          <div className="font-16-m mx-3.5 text-[#79747E]">or</div>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <div
          className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl border
            border-gray-200 py-[17.5px]"
        >
          <Image width={24} height={24} src="/image/kakao.png" alt="kakao" />
          <div className="typo-16-m text-gray-600">카카오 로그인</div>
        </div>

        <div className="typo-16-m mt-6 text-gray-400 md:mt-7.5">
          회원이 아니신가요?{" "}
          <Link href="/register" className="underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
