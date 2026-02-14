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
      </main>
    </>
  );
};

export default MyActivityUpsertLayout;
