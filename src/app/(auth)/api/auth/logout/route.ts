import { NextResponse } from "next/server";

import { clearTokenCookies } from "@/lib/auth/auth";

// 쿠키를 제거해서 로그아웃을 하는 api
const POST = async () => {
  await clearTokenCookies();
  return NextResponse.json({ success: true });
};

export { POST };
