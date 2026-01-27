"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

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
    <div className="mt-16.25 flex w-full flex-col items-center px-6 md:mt-34.75">
      <Image width={144} height={144} src="/image/earth.png" alt="logo image" />
      <Image
        width={255}
        height={31}
        src="/image/logo.png"
        alt="logo text"
        className="mt-6 hidden md:block"
      />
      <form className="mt-10.5 w-full md:mt-15.5 md:w-160" action={onLoginAction}>
        {/* 이메일 */}
        <div className="typo-16-m mb-2.5 text-gray-950">이메일</div>
        <input
          placeholder="이메일을 입력해 주세요"
          type="email"
          name="email"
          className="text-16-m w-full rounded-2xl border border-gray-300 py-[17.5px] pl-5"
        />

        {/* 패스워드 */}
        <div className="text-16-m mt-5 mb-2.5 text-gray-950">패스워드</div>
        <input
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          name="password"
          className="text-16-m w-full rounded-2xl border border-gray-300 py-[17.5px] pl-5"
        />

        <button
          className="bg-primary-500 mt-7.5 w-full rounded-2xl py-[17.5px] font-bold text-white"
        >
          로그인하기
        </button>
      </form>
    </div>
  );
};

export default Login;
