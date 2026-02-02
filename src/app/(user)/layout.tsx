import { ReactNode } from "react";

import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-116px)] pt-12 md:min-h-[calc(100vh-140px)] md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
