"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PasswordInput from "@/components/common/PasswordInput";
import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import useAuthStore from "@/store/useAuthStore";
import Button from "@/components/common/Button";
import { useModalStore } from "@/store/useModalStore";
import InvalidPasswordModal from "@/app/(auth)/login/_components/InvalidPasswordModal";

// 로그인 페이지
const Login = () => {
  const navigation = useRouter();
  const { login, setTokens, user } = useAuthStore();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email && password && !emailError && !passwordError;
  const { openModal } = useModalStore();

  // 로그인 처리
  const onLoginAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    try {
      const res = await client.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      setTokens(res.data.accessToken, res.data.refreshToken);
      login(res.data.user);
    } catch {
      openModal({
        position: "center",
        containerClassName: "max-h-35 md:max-h-42.5 max-w-80 md:max-w-100",
        children: <InvalidPasswordModal />,
      });
    }
  };

  // 이메일 검증
  const handleValidateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.exec(email)) setEmailError(false);
    else setEmailError(true);
  };

  // 패스워드 검증
  const handleValidatePassword = () => {
    setPasswordError(password.length < 8);
  };

  // 이메일이 변경됐을 때
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 패스워드가 변경됐을 때
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKakaoClick = () => {
    window.location.href = "/auth/kakao?state=signin";
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
            className={`text-16-m w-full rounded-2xl border
              ${emailError ? "border-red-500" : "border-gray-100"} py-[17.5px] pl-5 outline-0`}
            value={email}
            onChange={handleChangeEmail}
            onBlur={handleValidateEmail}
          />

          {emailError && (
            <div className="typo-12-m mt-1.5 text-red-500">이메일 형식으로 작성해 주세요.</div>
          )}

          {/* 패스워드 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호</div>
          <PasswordInput
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            name="password"
            className={`w-full ${passwordError ? "border-red-500" : ""}`}
            value={password}
            onChange={handleChangePassword}
            onBlur={handleValidatePassword}
          />

          {passwordError && (
            <div className="typo-12-m mt-1.5 text-red-500">8자 이상 입력해 주세요.</div>
          )}

          <Button
            variant={canLogin ? "primary" : "disabled"}
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
    </div>
  );
};

export default Login;
