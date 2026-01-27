import { ReactNode } from "react";

import ProfileNav from "./_components/profileNav/ProfileNav";

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <ProfileNav />
      {children}
    </>
  );
};

export default ProfileLayout;
