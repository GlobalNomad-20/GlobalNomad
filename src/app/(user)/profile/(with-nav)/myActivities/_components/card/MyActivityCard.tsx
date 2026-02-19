"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import CustomImage from "@/components/common/CustomImage";
import { MyActivity } from "@/types/myActivities";
import { cn } from "@/utils/cn";
import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";
import { useDeleteActivity } from "@/hooks/queries/useMyActivities";

interface MyActivityCardProps {
  myActivity: MyActivity;
}

const MyActivityCard = ({ myActivity }: MyActivityCardProps) => {
  const router = useRouter();
  const { mutate: deleteActivity, isPending } = useDeleteActivity();

  const handleMyActivityEditRouteClick = () => {
    return router.push(ROUTES.PROFILE.MY_ACTIVITIES.EDIT(myActivity.id));
  };

  const handleDeleteClick = () => {
    if (confirm(`"${myActivity.title}" 체험을 삭제하시겠습니까?`)) {
      deleteActivity(myActivity.id, {
        onSuccess: () => {
          alert("체험이 삭제되었습니다.");
        },
      });
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative mb-4 h-45",
          "rounded-3xl shadow-[0_4px_20px_0_rgba(156,180,202,0.2)]",
          "h-39 p-6 lg:mb-6 lg:h-50 lg:p-7.5",
        )}
      >
        <div
          className="absolute right-6 h-20.5 w-20.5 overflow-hidden rounded-3xl lg:right-7.5 lg:h-35
            lg:w-35 lg:rounded-4xl"
        >
          <CustomImage
            key={myActivity.bannerImageUrl}
            src={myActivity.bannerImageUrl}
            alt={myActivity.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-col justify-center">
          <h2 className="typo-16-b lg:typo-18-b mb-1.5 line-clamp-1 w-2/3 md:w-3/4 lg:mb-2">
            {myActivity.title}
          </h2>

          <div className="mb-2.5 flex items-center gap-1 lg:mb-3">
            <Image src="/image/yellowStar.png" alt="노란 별" width={20} height={20} />
            <p className="typo-13-m lg:typo-16-m text-gray-500">
              {myActivity.rating}({myActivity.reviewCount})
            </p>
          </div>

          <p className="typo-16-b lg:typo-18-b mb-3 lg:mb-5">
            ₩{myActivity.price.toLocaleString()}
            <span className="typo-14-m lg:typo-16-m text-gray-400">/ 인</span>
          </p>

          <div className="flex h-7 gap-2">
            <Button
              variant="outline"
              className="typo-14-m w-17 rounded-lg"
              onClick={handleMyActivityEditRouteClick}
              type="button"
              disabled={isPending}
            >
              수정하기
            </Button>
            <Button
              className="typo-14-m w-17 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"
              onClick={handleDeleteClick}
              type="button"
              disabled={isPending}
            >
              {isPending ? "삭제 중..." : "삭제하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivityCard;
