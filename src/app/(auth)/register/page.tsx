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
import OKModal from "@/app/(auth)/login/_components/OKModal";

// 로그인 페이지
const Login = () => {
  const navigation = useRouter();
  const { login, setTokens, user } = useAuthStore();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const canLogin = email && password && !emailError && !passwordError;
  const { openModal } = useModalStore();

  // 회원가입 처리
  const onLoginAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const nickname = formData.get("nickname")?.toString() ?? "";

    try {
      const res = await client.post(API_ENDPOINTS.USERS.SIGNUP, { email, password, nickname });
      setTokens(res.data.accessToken, res.data.refreshToken);
      login(res.data.user);
    } catch {
      openModal({
        position: "center",
        containerClassName: "max-h-35 md:max-h-42.5 max-w-80 md:max-w-100",
        children: <OKModal message="Hello" />,
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

  // 패스워드 확인 검증
  const handleValidatePasswordConfirm = () => {
    setPasswordConfirmError(password.length != passwordConfirm.length);
  };

  // 닉네임 검증
  const handleValidateNickname = () => {
    setNicknameError(nickname.length > 10);
  };

  // 이메일이 변경됐을 때
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 패스워드가 변경됐을 때
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 패스워드 확인
  const handleChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  // 닉네임이 변경됐을 때
  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleKakaoClick = () => {
    window.location.href = "/auth/kakao?state=signup";
  };

  useEffect(() => {
    if (user && navigation) navigation.replace("/");
  }, [user, navigation]);

  return (
    <div className="mb-25 flex w-full flex-col items-center px-6">
      <div className="mt-16.25 flex w-full flex-col items-center md:mt-34.75 md:w-160">
        <Link className="flex flex-col items-center" href="/">
          <Image width={144} height={144} src="/image/earth.png" alt="logo" />
          <Image
            width={255}
            height={31}
            src="/image/logo.png"
            alt="logo text"
            className="mt-6 hidden md:block"
          />
        </Link>
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

          {emailError && <div className="typo-12-m mt-1.5 text-red-500">잘못된 이메일 입니다.</div>}

          {/* 닉네임 */}
          <div className="typo-16-m mt-5 mb-2.5 text-gray-950">닉네임</div>
          <input
            placeholder="닉네임을 입력해 주세요"
            type="text"
            name="text"
            className={`text-16-m w-full rounded-2xl border
              ${nicknameError ? "border-red-500" : "border-gray-100"} py-[17.5px] pl-5 outline-0`}
            value={nickname}
            onChange={handleChangeNickname}
            onBlur={handleValidateNickname}
          />

          {nicknameError && (
            <div className="typo-12-m mt-1.5 text-red-500">열 자 이하로 작성해주세요.</div>
          )}

          {/* 비밀번호 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호</div>
          <input
            placeholder="8자 이상 입력해 주세요"
            type="password"
            name="password"
            className={`text-16-m w-full rounded-2xl border py-[17.5px] pl-5 outline-0
              ${passwordError ? "border-red-500" : "border-gray-100"}`}
            value={password}
            onChange={handleChangePassword}
            onBlur={handleValidatePassword}
          />

          {passwordError && (
            <div className="typo-12-m mt-1.5 text-red-500">8자 이상 입력해 주세요.</div>
          )}

          {/* 비밀번호 확인 */}
          <div className="text-16-m mt-5 mb-2.5 text-gray-950">비밀번호 확인</div>
          <PasswordInput
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            type="password"
            name="password"
            className={`w-full ${passwordConfirmError ? "border-red-500" : ""}`}
            value={passwordConfirm}
            onChange={handleChangePasswordConfirm}
            onBlur={handleValidatePasswordConfirm}
          />

          {passwordConfirmError && (
            <div className="typo-12-m mt-1.5 text-red-500">비밀번호가 일치하지 않습니다.</div>
          )}

          <Button
            variant={canLogin ? "primary" : "disabled"}
            className="mt-7.5 h-13.5 w-full text-white"
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
    </div>
  );
};

export default Login;
