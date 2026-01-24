"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import useAuthStore from "@/store/useAuthStore";
import Globe from "@/app/components/imgs/globe";
import LogoText from "@/app/components/imgs/logoText";

// 로그인 페이지
export default function Login() {
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
    <div className="mt-[65px] flex w-full flex-col items-center px-6 md:mt-[139px]">
      <Globe />
      <LogoText className="mt-6 hidden md:block" />
      <form className="mt-[42px] w-full md:mt-[62px] md:w-[640px]" action={onLoginAction}>
        {/* 이메일 */}
        <div className="typo-16-m mb-[10px] text-gray-950">이메일</div>
        <input
          placeholder="이메일을 입력해 주세요"
          type="email"
          name="email"
          className="text-16-m w-full rounded-[16px] border border-gray-300 py-[17.5px] pl-[20px]"
        />

        {/* 패스워드 */}
        <div className="text-16-m mt-[20px] mb-[10px] text-gray-950">패스워드</div>
        <input
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          name="password"
          className="text-16-m w-full rounded-[16px] border border-gray-300 py-[17.5px] pl-[20px]"
        />

        <button
          className="bg-primary-500 mt-[30px] w-full rounded-[16px] py-[17.5px] font-bold
            text-white"
        >
          로그인하기
        </button>
      </form>
    </div>
  );
}
