"use client";

import Button from "@/components/common/Button";
import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

const ReservationCard = () => {
  const isPC = useMediaQuery(MEDIA_QUERY.PC);

  return (
    <div className={cn("max-w-160", { "border-t border-t-gray-50 pt-5": !isPC })}>
      {!isPC && <h1 className="typo-16-b mb-3 px-2 text-gray-800">2026. 02. 03</h1>}
      <div
        className={cn(
          "relative h-34 max-w-160",
          "mb-3 rounded-3xl p-6",
          "lg:mb-0 lg:h-45 lg:rounded-4xl",
          "shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]",
          "bg-[url('/image/banner.jpg')] bg-cover bg-center bg-no-repeat",
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 flex h-34 w-3/4 flex-col items-start justify-start",
            "rounded-3xl bg-white p-5",
            "lg:h-45 lg:rounded-4xl lg:px-10 lg:py-7.5",
            "shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)]",
          )}
        >
          <div
            className="typo-13-b mb-2 flex h-6 w-16 items-center justify-center rounded-4xl
              bg-[#DAF0FF] text-[#0D6CD1] lg:mb-3"
          >
            체험 완료
          </div>
          <h2 className="typo-14-b lg:typo-18-b mb-1 lg:mb-2.5">발리 코끼리 목욕 체험</h2>
          <p className="typo-13-m lg:typo-16-m mb-2 text-gray-500">16:00 - 17:00</p>
          <div className="flex w-full items-center justify-between">
            <p className="typo-16-b lg:typo-18-b">
              ₩40,000 <span className="typo-14-m lg:typo-16-m text-gray-400">2명</span>
            </p>
            {/* TODO: 상태에 따라 예약 취소 버튼 있어야 함 */}
            {isPC && <Button className="typo-14-m w-18 rounded-lg py-1.5">후기 작성</Button>}
          </div>
        </div>
      </div>

      {/* Tablet, Mobile */}
      {!isPC && <Button className="typo-14-m w-full max-w-160 rounded-lg py-2.5">후기 작성</Button>}
      {/* TODO: 상태에 따라 예약 취소 버튼 있어야 함 */}
    </div>
  );
};

export default ReservationCard;
