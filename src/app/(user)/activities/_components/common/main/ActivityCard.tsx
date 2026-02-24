import { motion } from "framer-motion";

import StarSvg from "@/assets/svg/StarSvg";
import CustomImage from "@/components/common/CustomImage";
import { Activity } from "@/types/activityCardList";
import { cn } from "@/utils/cn";

interface ActivityCardProps {
  activity: Activity;
  isSmall?: boolean;
}

const ActivityCard = ({ activity, isSmall = false }: ActivityCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={cn(
        "group relative h-60.5 shrink-0 cursor-pointer overflow-hidden rounded-[18px]",
        "shadow-[0px_2.25px_13.5px_0px_rgba(156,180,202,0.2)]",
        "md:h-105.75 md:w-82.75 lg:h-91.5 lg:w-65.5",
        isSmall ? "w-32.75" : "w-38.75",
      )}
    >
      <div
        className="group peer absolute bottom-0 z-10 flex h-25 w-full flex-col rounded-[18px]
          bg-white px-4.25 py-4 shadow-[0px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)] transition-all
          duration-300 ease-out group-hover:h-full hover:justify-center hover:bg-gray-950/60 md:h-34
          md:px-7.5 md:py-5"
      >
        <div
          className={cn(
            `md:typo-18-b mb:mb-0.5 mb-1 truncate text-sm leading-4.5 font-semibold text-[#1F1F22]
            md:leading-6.5`,
            `group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal
            group-hover:text-white`,
          )}
        >
          {activity.title}
        </div>
        <div
          className="typo-12-m md:typo-14-m md:md-4.5 mb-2.5 flex items-center leading-4.5
            md:leading-6"
        >
          <StarSvg className="h-3 w-3 pr-1 md:h-4.25 md:w-4.25 md:pr-1.25" />
          <span className="text-gray-950 group-hover:text-white">
            {Math.floor(activity.rating)}
          </span>
          <span className="ml-0.5 text-gray-400">({activity.reviewCount})</span>
        </div>
        <div
          className="font-pretendard md:typo-18-b flex items-center text-[15px] leading-4.5
            font-bold text-gray-950 group-hover:text-white md:leading-6.5"
        >
          ₩ {activity ? new Intl.NumberFormat("ko-KR").format(activity.price) : "-"}
          <span className="typo-12-b md:typo-16-m text-gray-400">/ 인</span>
        </div>
      </div>
      <div
        className="absolute top-0 h-44 w-full overflow-hidden rounded-[18px]
          shadow-[0px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out
          peer-hover:h-full md:h-105.75 lg:h-72.5"
      >
        <CustomImage
          src={activity.bannerImageUrl}
          alt="배너 이미지"
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};

export default ActivityCard;
