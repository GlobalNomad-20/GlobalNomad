import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MyActivityUpsertLayout = ({ children }: Props) => {
  return (
    <>
      <main className="min-h-[calc(100vh-116px)] pt-12 md:min-h-[calc(100vh-140px)] md:pt-20">
        {children}
      </main>
    </>
  );
};

export default MyActivityUpsertLayout;
