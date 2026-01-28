import Image from "next/image";

import StarIcon from "@/assets/svg/starIcon";

const ActivityCard = () => {
  return (
    <div
      className="relative h-60.5 w-32.75 shrink-0 cursor-pointer rounded-[18px]
        shadow-[0px_2.25px_13.5px_0px_rgba(156,180,202,0.2)] md:h-105.75 md:w-82.75 lg:h-91.5
        lg:w-65.5"
    >
      <div
        className="absolute top-0 h-44 w-full overflow-hidden rounded-[18px]
          shadow-[0px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)] md:h-105.75 lg:h-72.5"
      >
        <Image src="/image/banner.jpg" alt="배너 이미지" fill className="object-cover" />
      </div>
      <div
        className="absolute bottom-0 z-10 flex h-25 w-full flex-col rounded-[18px] bg-white px-4.25
          py-4 shadow-[0px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)] md:h-34 md:px-7.5 md:py-5"
      >
        <div
          className="md:typo-18-b mb:mb-0.5 mb-1 truncate text-sm leading-[18px] font-semibold
            text-[#1F1F22] md:leading-[26px]"
        >
          오 진짜 완전 긴 제목이다 대박사건이지예
        </div>
        <div
          className="typo-12-m md:typo-14-m md:md-4.5 mb-2.5 flex items-center leading-[18px]
            md:leading-[24px]"
        >
          <StarIcon className="h-3 w-3 pr-1 md:h-4.25 md:w-4.25 md:pr-1.25" />
          <span className="text-gray-950">3.9</span>
          <span className="ml-[2px] text-gray-400">(108)</span>
        </div>
        <div
          className="font-pretendard md:typo-18-b flex items-center text-[15px] leading-[18px]
            font-bold text-gray-950 md:leading-[26px]"
        >
          ₩ 35,000<span className="typo-12-b md:typo-16-m text-gray-400">/ 인</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
