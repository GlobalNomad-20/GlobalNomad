"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";

const CreateMyActivityButton = () => {
  const router = useRouter();

  const handleMyActivityAddRouteClick = () => {
    return router.push(ROUTES.PROFILE.MY_ACTIVITIES.ADD);
  };

  return (
    <div>
      <Button
        className="typo-14-b md:typo-16-b h-10 w-15 md:h-12 md:w-34"
        onClick={handleMyActivityAddRouteClick}
        type="button"
      >
        <span className="md:hidden">등록</span>
        <span className="hidden md:inline">체험 등록하기</span>
      </Button>
    </div>
  );
};

export default CreateMyActivityButton;
