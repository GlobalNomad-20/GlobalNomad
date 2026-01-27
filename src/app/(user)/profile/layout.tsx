import { ReactNode } from "react";

import ProfileNav from "./_components/profileNav/ProfileNav";

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div
      className="h-full md:mx-7.5 md:mt-7.5 md:flex md:gap-7.5 lg:m-0 lg:mx-auto lg:max-w-245
        lg:gap-12.5"
    >
      <ProfileNav />
      {children}
    </div>
  );
};

export default ProfileLayout;
