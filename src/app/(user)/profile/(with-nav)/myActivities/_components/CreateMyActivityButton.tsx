"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ROUTES } from "@/constants/routes";

const CreateMyActivityButton = () => {
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE);
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
        {isMobile ? "등록" : "체험 등록하기"}
      </Button>
    </div>
  );
};

export default CreateMyActivityButton;
