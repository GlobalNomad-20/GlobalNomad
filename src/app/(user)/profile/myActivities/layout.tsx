import Script from "next/script";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MyActivityUpsertLayout = ({ children }: Props) => {
  return (
    <>
      <main
        className="mx-auto mb-18 max-w-175 px-6 pt-7.5 md:mb-12 md:px-7.5 md:pt-10 lg:mb-30 lg:px-0"
      >
        {children}
        <Script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="afterInteractive"
        />
      </main>
    </>
  );
};

export default MyActivityUpsertLayout;
