import type { Metadata } from "next";

import QueryProviders from "./_providers/QueryProviders";
import { pretendard } from "./fonts";

import "./globals.css";
import { fetchWithAuth } from "@/lib/auth/auth";
import { User } from "@/types/user";
import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { AuthProvider } from "@/app/_providers/AuthProvider";

export const metadata: Metadata = {
  title: "GlobalNoamd",
  description: "GlobalNomad는 판매자와 체험자가 공존하는 체험 예약 플랫폼입니다.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const url = `${BASE_URL}${API_ENDPOINTS.USERS.ME}`;
  const user = await fetchWithAuth<User>(url);
  const initialState = { user: user };

  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`${pretendard.className} min-w-93.75 antialiased`}>
        <QueryProviders>
          <AuthProvider initialState={initialState}>{children}</AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
};

export default RootLayout;
