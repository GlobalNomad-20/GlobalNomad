import type { Metadata } from "next";

import QueryProviders from "./_providers/QueryProviders";
import { pretendard } from "./fonts";
import "./globals.css";
import AuthProvider from "./_providers/AuthProvider";

export const metadata: Metadata = {
  title: "GlobalNoamd",
  description: "GlobalNomad는 판매자와 체험자가 공존하는 체험 예약 플랫폼입니다.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`${pretendard.className} antialiased`}>
        <QueryProviders>
          <AuthProvider>{children}</AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
};

export default RootLayout;
