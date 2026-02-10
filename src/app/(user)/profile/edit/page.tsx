import ProfileEditField from "./_components/ProfileEditField";

import { fetchMyInfoServer } from "@/api/user";

const ProfilePage = async () => {
  const userData = await fetchMyInfoServer();

  return (
    <div className="w-full px-6 pt-8.75 pb-8.75 md:p-0">
      <ProfileEditField initialData={userData} />
    </div>
  );
};

export default ProfilePage;
