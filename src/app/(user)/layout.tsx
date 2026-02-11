import Script from "next/script";
import { ReactNode } from "react";

import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=fffe46b551f22c5e32b99a95f3b66390&autoload=false&libraries=services`}
        strategy="beforeInteractive"
      />
      <Header />
      <main className="min-h-[calc(100vh-116px)] pt-12 md:min-h-[calc(100vh-140px)] md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
