import { NextRequest, NextResponse } from "next/server";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { setTokenCookies } from "@/lib/client/auth";

// 이메일로 로그인 후, 쿠키 설정해주는 api
const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const res = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || "로그인 실패" }, { status: res.status });
    }

    const { accessToken, refreshToken, user } = data;

    await setTokenCookies({ accessToken, refreshToken });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
};

export { POST };
